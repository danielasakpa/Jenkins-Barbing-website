"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type ImageUploaderProps = {
  setUploaded: Dispatch<SetStateAction<boolean>>;
};

const ImageUploader = ({ setUploaded }: ImageUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          resolve(reader.result as string);
        } else {
          reject(new Error("Failed to convert file to base64"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      toast({
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const base64File = await fileToBase64(file);

      const response = await axios.post(
        "/api/gallery/upload",
        {
          imageUrl: base64File,
          title: title,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast({
          description: "Image uploaded successfully!",
          variant: "default",
          className: "bg-green-600 text-white",
        });
        setUploaded((prev) => !prev);
        // router.push("/gallery");
      } else {
        toast({
          description: response.data.error || "Failed to upload image.",
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        description: "An error occurred while uploading the image.",
        variant: "destructive",
      });
    } finally {
      setTitle("");
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-black mx-auto text-white">
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Add a new image to your gallery.</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Image File</Label>
            <Input
              id="image"
              type="file"
              onChange={handleFileChange}
              required
            />
            {/* Display the selected file name */}
            {file && <p className="text-sm mt-2">Selected file: {file.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Image Title (optional)</Label>
            <Input
              id="title"
              type="text"
              placeholder="Image Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {loading ? "Uploading..." : "Upload Image"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ImageUploader;
