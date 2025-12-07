/**
 * Image Crop Upload Component
 * Upload and crop images before saving
 */
"use client";

import React, { useState, useRef, useCallback } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  CircularProgress,
  Typography,
  IconButton,
} from "@mui/material";
import {
  CloudUpload as UploadIcon,
  Close as CloseIcon,
  CameraAlt as CameraIcon,
} from "@mui/icons-material";
import { apiClient } from "@/lib/api";

interface ImageCropUploadProps {
  onImageUploaded: (url: string) => void;
  uploadType?: "restaurant" | "menu" | "profile" | "temp";
  aspectRatio?: number;
  currentImage?: string;
  buttonText?: string;
  buttonVariant?: "text" | "outlined" | "contained";
}

export default function ImageCropUpload({
  onImageUploaded,
  uploadType = "temp",
  aspectRatio,
  currentImage,
  buttonText = "Upload Image",
  buttonVariant = "outlined",
}: ImageCropUploadProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 90,
    height: aspectRatio ? 90 / aspectRatio : 90,
    x: 5,
    y: 5,
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [uploading, setUploading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImageSrc(reader.result?.toString() || "");
        setDialogOpen(true);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;
      const cropWidthPercent = 90;
      const cropHeightPercent = aspectRatio
        ? cropWidthPercent / aspectRatio
        : 90;

      setCrop({
        unit: "%",
        width: cropWidthPercent,
        height: cropHeightPercent,
        x: (100 - cropWidthPercent) / 2,
        y: (100 - cropHeightPercent) / 2,
      });
    },
    [aspectRatio]
  );

  const getCroppedImg = useCallback(
    async (image: HTMLImageElement, crop: PixelCrop): Promise<Blob> => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        throw new Error("No 2d context");
      }

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      return new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Canvas is empty"));
              return;
            }
            resolve(blob);
          },
          "image/jpeg",
          0.95
        );
      });
    },
    []
  );

  const handleUpload = async () => {
    if (!imgRef.current || !completedCrop) {
      return;
    }

    setUploading(true);
    try {
      const croppedBlob = await getCroppedImg(imgRef.current, completedCrop);

      const formData = new FormData();
      formData.append("file", croppedBlob, "image.jpg");
      formData.append("upload_type", uploadType);

      const response = await apiClient.post("/upload/image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = `http://localhost:8000${response.data.url}`;
      onImageUploaded(imageUrl);
      setDialogOpen(false);
      setImageSrc("");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setDialogOpen(false);
    setImageSrc("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        style={{ display: "none" }}
      />
      <Button
        variant={buttonVariant}
        startIcon={buttonText ? <UploadIcon /> : undefined}
        onClick={() => fileInputRef.current?.click()}
        fullWidth={!!buttonText}
        size={buttonText ? "medium" : "small"}
        sx={
          !buttonText
            ? {
                minWidth: "auto",
                width: "100%",
                height: "100%",
                p: 0,
                color: "white",
                "&:hover": {
                  bgcolor: "transparent",
                },
              }
            : undefined
        }
      >
        {buttonText || <CameraIcon sx={{ fontSize: 20 }} />}
      </Button>

      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Crop Image</Typography>
            <IconButton onClick={handleClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {imageSrc && (
            <Box sx={{ maxHeight: "70vh", overflow: "auto" }}>
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
              >
                <img
                  ref={imgRef}
                  src={imageSrc}
                  alt="Crop"
                  onLoad={onImageLoad}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </ReactCrop>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={uploading}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            variant="contained"
            disabled={!completedCrop || uploading}
            startIcon={
              uploading ? <CircularProgress size={20} /> : <UploadIcon />
            }
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
