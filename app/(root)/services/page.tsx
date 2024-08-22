"use client";

import React, { useState } from "react";
import { useServices } from "@/context/ServicesContext";
import { Service } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const page = () => {
  const { services, loading, updateService, deleteService, createService } =
    useServices();
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [prevPrice, setPrevPrice] = useState("");
  const [newService, setNewService] = useState<Partial<Service>>({
    service: "",
    price: "0",
    desc: "",
    negotiable: false,
    imageUrl: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setPrevPrice(service.price);
  };

  const handleDeleteService = (id: string) => {
    deleteService(id);
  };

  const handleUpdateService = () => {
    if (editingService) {
      updateService(editingService.id, editingService);
      setEditingService(null);
    }
  };

  const validateImage = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(file.type)) {
      setError("Please select a valid image file (JPEG, PNG, GIF).");
      return false;
    }

    if (file.size > maxSize) {
      setError("The image size must be less than 2MB.");
      return false;
    }

    setError(null);
    return true;
  };

  const handleCreateService = () => {
    console.log(newService);
    const { service, price, desc, imageUrl } = newService;

    // Validate that all fields are filled
    if (!service || !price || !desc || !imageUrl) {
      setError("All fields are required. Please fill in all the details.");
      return;
    }

    createService(newService as Service);
    setNewService({
      service: "",
      price: "0",
      desc: "",
      negotiable: false,
      imageUrl: "",
    });
    setError(null);
  };

  return (
    <div className="p-4 mt-8">
      <h1 className="text-xl font-bold mb-4">Manage Services</h1>

      {/* List of Services */}
      {services.map((service) => (
        <div key={service.id} className="mb-4 p-4 border rounded-lg gap-2">
          <Image
            src={service.imageUrl}
            className="w-full rounded-lg overflow-hidden object-cover aspect-[4/3] mb-2"
            width="400"
            height="300"
            alt="Service"
          />
          <h2 className="text-lg font-semibold">{service.service}</h2>
          <p className="text-sm">
            Price: {service.negotiable ? "Negotiable" : service.price}
          </p>
          <p className="text-sm">Description: {service.desc}</p>
          <p className="text-sm">
            Negotiable:{" "}
            <span
              className={`${
                service.negotiable ? "text-green-600" : "text-red-600"
              }`}
            >
              {service.negotiable ? "true" : "false"}
            </span>
          </p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleEditService(service)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteService(service.id)}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>

          {/* Edit Service Dialog */}
          {editingService && (
            <Dialog open onOpenChange={() => setEditingService(null)}>
              <DialogContent className="rounded-md">
                <DialogHeader>
                  <DialogTitle>Edit Service</DialogTitle>
                  <DialogDescription>
                    Update the details of the service.
                  </DialogDescription>
                </DialogHeader>
                <input
                  type="text"
                  value={editingService.service}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      service: e.target.value,
                    })
                  }
                  className="block w-full mb-2 p-2 border rounded"
                  placeholder="Service Name"
                />
                <input
                  type="text"
                  value={
                    editingService.negotiable
                      ? "Negotiable"
                      : editingService.price
                  }
                  onChange={(e) => {
                    if (!editingService.negotiable) {
                      setEditingService({
                        ...editingService,
                        price: e.target.value,
                      });
                    }
                  }}
                  disabled={editingService.negotiable}
                  className="block w-full mb-2 p-2 border rounded"
                  placeholder="Price"
                />
                <textarea
                  value={editingService.desc}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      desc: e.target.value,
                    })
                  }
                  className="block w-full mb-2 p-2 border rounded"
                  placeholder="Description"
                />
                <input
                  type="file"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && validateImage(file)) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditingService({
                          ...editingService,
                          imageUrl: reader.result as string,
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full mb-2 p-2 border rounded"
                />
                {editingService.imageUrl && (
                  <img
                    src={editingService.imageUrl}
                    alt="Service"
                    className="w-full h-32 object-cover mb-2 rounded"
                  />
                )}
                <label className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    checked={editingService.negotiable}
                    onChange={(e) => {
                      const isNegotiable = e.target.checked;
                      setPrevPrice(editingService.price);
                      setEditingService((prev) => ({
                        ...prev!,
                        negotiable: isNegotiable,
                        price: isNegotiable ? "Negotiable" : prevPrice || "0",
                      }));
                    }}
                    className="mr-2"
                  />
                  Negotiable
                </label>
                <DialogFooter>
                  <DialogClose asChild>
                    <button
                      onClick={handleUpdateService}
                      className="px-4 py-2 bg-[#028391] text-white rounded"
                    >
                      Save Changes
                    </button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ))}

      {/* Create New Service Form */}
      <Card className="w-full max-w-md bg-black mx-auto text-white mb-5 mt-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Create New Service
          </CardTitle>
          <CardDescription>
            Add a new service to your collection.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && <p className="text-red-500">{error}</p>}
          <div className="space-y-2">
            <Label htmlFor="service Name">Service Name</Label>
            <Input
              id="service Name"
              type="text"
              required
              value={newService.service}
              onChange={(e) =>
                setNewService({ ...newService, service: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded text-black"
              placeholder="Service Name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="text"
              required
              value={newService.negotiable ? "Negotiable" : newService.price}
              onChange={(e) => {
                if (!newService.negotiable) {
                  setNewService({
                    ...newService,
                    price: e.target.value,
                  });
                }
              }}
              disabled={newService.negotiable}
              className="block w-full mb-2 p-2 border rounded text-black"
              placeholder="Price"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Service Description</Label>
            <Textarea
              id="desc"
              value={newService.desc}
              required
              onChange={(e) =>
                setNewService({ ...newService, desc: e.target.value })
              }
              className="block w-full mb-2 p-2 border rounded"
              placeholder="Description"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="service img">Service Image</Label>
            <Input
              id="service img"
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file && validateImage(file)) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setNewService({
                      ...newService,
                      imageUrl: reader.result as string,
                    });
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="block w-full mb-2 p-2 border rounded"
            />
          </div>
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={newService.negotiable || false}
              onChange={(e) => {
                const isNegotiable = e.target.checked;
                setNewService({
                  ...newService,
                  negotiable: isNegotiable,
                  price: isNegotiable ? "Negotiable" : "0",
                });
              }}
              className="mr-2"
            />
            Negotiable
          </label>
          <button
            onClick={handleCreateService}
            className="px-4 py-2 bg-[#028391] text-white rounded"
          >
            Add Service
          </button>
        </CardContent>
      </Card>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <Loader2 className="animate-spin h-8 w-8 text-white" />
        </div>
      )}
    </div>
  );
};

export default page;
