import React, { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, AlertCircle, Upload } from "lucide-react";

interface VerificationStatusProps {
  isVerified: boolean;
  onSubmit: () => void;
}

const VerificationStatus: React.FC<VerificationStatusProps> = ({
  isVerified,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    idType: "",
    idNumber: "",
    address: "",
    phoneNumber: "",
    idDocument: null as File | null,
    addressDocument: null as File | null,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "idDocument" | "addressDocument"
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.files?.[0] || null,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, send verification data to API
    onSubmit();
  };

  if (isVerified) {
    return (
      <Alert className="bg-green-50 border-green-600">
        <CheckCircle className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-600">
          Verification Complete
        </AlertTitle>
        <AlertDescription>
          Your account has been successfully verified. You now have full access
          to all seller features.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <Alert className="mb-6 bg-blue-50 border-blue-500">
        <AlertCircle className="h-5 w-5 text-blue-500" />
        <AlertTitle className="text-blue-500">Verification Required</AlertTitle>
        <AlertDescription>
          Please complete the verification process to unlock all seller features
          and build trust with customers.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="idType">ID Type</Label>
              <Input
                id="idType"
                name="idType"
                placeholder="Driver's License, Passport, etc."
                value={formData.idType}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">ID Number</Label>
              <Input
                id="idNumber"
                name="idNumber"
                placeholder="Enter your ID number"
                value={formData.idNumber}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Full Address</Label>
            <Textarea
              id="address"
              name="address"
              placeholder="Enter your full address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Enter your phone number"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="idDocument">Upload ID Document</Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Upload a clear photo of your ID
                    </p>
                    <Input
                      id="idDocument"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "idDocument")}
                      accept="image/*,.pdf"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("idDocument")?.click()
                      }
                    >
                      Select File
                    </Button>
                    {formData.idDocument && (
                      <p className="mt-2 text-sm text-gray-600">
                        {formData.idDocument.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="addressDocument">
                    Upload Proof of Address
                  </Label>
                  <div className="border-2 border-dashed rounded-md p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500 mb-2">
                      Upload a bill or document showing your address
                    </p>
                    <Input
                      id="addressDocument"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "addressDocument")}
                      accept="image/*,.pdf"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        document.getElementById("addressDocument")?.click()
                      }
                    >
                      Select File
                    </Button>
                    {formData.addressDocument && (
                      <p className="mt-2 text-sm text-gray-600">
                        {formData.addressDocument.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Button type="submit" className="w-full">
            Submit Verification
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationStatus;
