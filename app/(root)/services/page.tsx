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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Loader2, Edit, Trash2, Plus, DollarSign, FileText } from "lucide-react";

const Page = () => {
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
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleEditService = (service: Service) => {
    setEditingService(service);
    setPrevPrice(service.price);
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      deleteService(id);
    }
  };

  const handleUpdateService = () => {
    if (editingService) {
      updateService(editingService.id, editingService);
      setEditingService(null);
    }
  };

  const validateImage = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024;

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
    const { service, price, desc, imageUrl } = newService;

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
    setShowCreateDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-24 pb-12 w-full">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Manage Services
            </h1>
            <p className="text-gray-600">Add, edit, or remove your barbershop services</p>
          </div>
          <button
            onClick={() => setShowCreateDialog(true)}
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-200 hover:scale-[1.02]"
          >
            <Plus className="w-5 h-5" />
            Add New Service
          </button>
        </div>

        {/* Services Grid */}
        {services.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-white rounded-2xl shadow-lg">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
              <FileText className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No services yet</h3>
            <p className="text-gray-600 text-center mb-8">
              Start by adding your first service to showcase your offerings
            </p>
            <button
              onClick={() => setShowCreateDialog(true)}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg hover:shadow-[#028391]/30 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Add First Service
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={service.imageUrl}
                    className="w-full h-full object-cover"
                    width="400"
                    height="300"
                    alt={service.service}
                  />
                  {service.negotiable && (
                    <span className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Negotiable
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {service.service}
                  </h2>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign className="w-5 h-5 text-[#028391]" />
                    <p className="text-lg font-semibold text-[#028391]">
                      {service.negotiable ? "Negotiable" : service.price}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {service.desc}
                  </p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditService(service)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-50 text-blue-600 font-medium rounded-xl hover:bg-blue-100 transition-colors duration-200"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Edit Service Dialog */}
        {editingService && (
          <Dialog open onOpenChange={() => setEditingService(null)}>
            <DialogContent className="rounded-2xl max-w-md">
              <DialogHeader>
                <DialogTitle className="text-2xl">Edit Service</DialogTitle>
                <DialogDescription>
                  Update the details of your service
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="edit-name">Service Name</Label>
                  <Input
                    id="edit-name"
                    value={editingService.service}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        service: e.target.value,
                      })
                    }
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-price">Price</Label>
                  <Input
                    id="edit-price"
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
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="edit-desc">Description</Label>
                  <Textarea
                    id="edit-desc"
                    value={editingService.desc}
                    onChange={(e) =>
                      setEditingService({
                        ...editingService,
                        desc: e.target.value,
                      })
                    }
                    className="mt-2"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="edit-image">Service Image</Label>
                  <Input
                    id="edit-image"
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
                    className="mt-2"
                  />
                  {editingService.imageUrl && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={editingService.imageUrl}
                      alt="Preview"
                      className="mt-3 w-full h-32 object-cover rounded-lg"
                    />
                  )}
                </div>

                <label className="flex items-center gap-2 cursor-pointer">
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
                    className="w-4 h-4 text-[#028391] rounded"
                  />
                  <span className="text-sm font-medium">Price is negotiable</span>
                </label>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
                    Cancel
                  </button>
                </DialogClose>
                <DialogClose asChild>
                  <button
                    onClick={handleUpdateService}
                    className="px-6 py-2.5 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {/* Create Service Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="rounded-2xl max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">Create New Service</DialogTitle>
              <DialogDescription>
                Add a new service to your collection
              </DialogDescription>
            </DialogHeader>
            
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="service-name">Service Name</Label>
                <Input
                  id="service-name"
                  value={newService.service}
                  onChange={(e) =>
                    setNewService({ ...newService, service: e.target.value })
                  }
                  className="mt-2"
                  placeholder="e.g., Classic Haircut"
                />
              </div>

              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  value={newService.negotiable ? "Negotiable" : newService.price}
                  onChange={(e) => {
                    if (!newService.negotiable) {
                      setNewService({ ...newService, price: e.target.value });
                    }
                  }}
                  disabled={newService.negotiable}
                  className="mt-2"
                  placeholder="e.g., $25"
                />
              </div>

              <div>
                <Label htmlFor="desc">Description</Label>
                <Textarea
                  id="desc"
                  value={newService.desc}
                  onChange={(e) =>
                    setNewService({ ...newService, desc: e.target.value })
                  }
                  className="mt-2"
                  rows={3}
                  placeholder="Describe your service..."
                />
              </div>

              <div>
                <Label htmlFor="image">Service Image</Label>
                <Input
                  id="image"
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
                  className="mt-2"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
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
                  className="w-4 h-4 text-[#028391] rounded"
                />
                <span className="text-sm font-medium">Price is negotiable</span>
              </label>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium">
                  Cancel
                </button>
              </DialogClose>
              <button
                onClick={handleCreateService}
                className="px-6 py-2.5 bg-gradient-to-r from-[#028391] to-cyan-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-200"
              >
                Add Service
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Loading Overlay */}
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
              <Loader2 className="animate-spin h-10 w-10 text-[#028391]" />
              <p className="text-gray-700 font-medium">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;