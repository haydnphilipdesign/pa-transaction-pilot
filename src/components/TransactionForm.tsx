
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, MapPin, Users, DollarSign, FileText } from "lucide-react";
import { Transaction, TransactionType, PropertyType } from "@/types/transaction";

interface TransactionFormProps {
  onSubmit: (transaction: Partial<Transaction>) => void;
  onCancel: () => void;
}

const TransactionForm = ({ onSubmit, onCancel }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    // Property Information
    address: "",
    city: "",
    state: "PA",
    zipCode: "",
    county: "",
    propertyType: "" as PropertyType,
    squareFootage: "",
    yearBuilt: "",
    lotSize: "",
    mlsNumber: "",
    
    // Transaction Details
    transactionType: "" as TransactionType,
    purchasePrice: "",
    contractDate: "",
    closingDate: "",
    notes: "",
    
    // Parties
    buyerFirstName: "",
    buyerLastName: "",
    buyerEmail: "",
    buyerPhone: "",
    sellerFirstName: "",
    sellerLastName: "",
    sellerEmail: "",
    sellerPhone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction: Partial<Transaction> = {
      property: {
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        county: formData.county,
        propertyType: formData.propertyType,
        squareFootage: formData.squareFootage ? parseInt(formData.squareFootage) : undefined,
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        lotSize: formData.lotSize || undefined,
        mlsNumber: formData.mlsNumber || undefined
      },
      transactionType: formData.transactionType,
      purchasePrice: parseFloat(formData.purchasePrice),
      contractDate: formData.contractDate,
      closingDate: formData.closingDate,
      notes: formData.notes || undefined,
      contacts: [
        {
          id: "buyer-1",
          firstName: formData.buyerFirstName,
          lastName: formData.buyerLastName,
          email: formData.buyerEmail,
          phone: formData.buyerPhone,
          role: "buyer" as const
        },
        {
          id: "seller-1",
          firstName: formData.sellerFirstName,
          lastName: formData.sellerLastName,
          email: formData.sellerEmail,
          phone: formData.sellerPhone,
          role: "seller" as const
        }
      ],
      status: "new" as const
    };

    onSubmit(transaction);
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Create New Transaction
          </CardTitle>
          <CardDescription>
            Enter the details for a new real estate transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Property Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-blue-600" />
                <h3 className="text-lg font-semibold">Property Information</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="address">Property Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => updateField("address", e.target.value)}
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    placeholder="Philadelphia"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateField("zipCode", e.target.value)}
                    placeholder="19101"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="county">County</Label>
                  <Input
                    id="county"
                    value={formData.county}
                    onChange={(e) => updateField("county", e.target.value)}
                    placeholder="Philadelphia"
                  />
                </div>
                
                <div>
                  <Label htmlFor="propertyType">Property Type *</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => updateField("propertyType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_family">Single Family</SelectItem>
                      <SelectItem value="condo">Condominium</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="multi_family">Multi-Family</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="land">Land</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="squareFootage">Square Footage</Label>
                  <Input
                    id="squareFootage"
                    type="number"
                    value={formData.squareFootage}
                    onChange={(e) => updateField("squareFootage", e.target.value)}
                    placeholder="2000"
                  />
                </div>
                
                <div>
                  <Label htmlFor="yearBuilt">Year Built</Label>
                  <Input
                    id="yearBuilt"
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => updateField("yearBuilt", e.target.value)}
                    placeholder="1985"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mlsNumber">MLS Number</Label>
                  <Input
                    id="mlsNumber"
                    value={formData.mlsNumber}
                    onChange={(e) => updateField("mlsNumber", e.target.value)}
                    placeholder="MLS12345"
                  />
                </div>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold">Transaction Details</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="transactionType">Transaction Type *</Label>
                  <Select value={formData.transactionType} onValueChange={(value) => updateField("transactionType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select transaction type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="purchase">Purchase</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="refinance">Refinance</SelectItem>
                      <SelectItem value="lease">Lease</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="purchasePrice">Purchase Price *</Label>
                  <Input
                    id="purchasePrice"
                    type="number"
                    value={formData.purchasePrice}
                    onChange={(e) => updateField("purchasePrice", e.target.value)}
                    placeholder="450000"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="contractDate">Contract Date *</Label>
                  <Input
                    id="contractDate"
                    type="date"
                    value={formData.contractDate}
                    onChange={(e) => updateField("contractDate", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="closingDate">Expected Closing Date *</Label>
                  <Input
                    id="closingDate"
                    type="date"
                    value={formData.closingDate}
                    onChange={(e) => updateField("closingDate", e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Parties Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-purple-600" />
                <h3 className="text-lg font-semibold">Parties Information</h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Buyer Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-blue-600">Buyer Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="buyerFirstName">First Name *</Label>
                      <Input
                        id="buyerFirstName"
                        value={formData.buyerFirstName}
                        onChange={(e) => updateField("buyerFirstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyerLastName">Last Name *</Label>
                      <Input
                        id="buyerLastName"
                        value={formData.buyerLastName}
                        onChange={(e) => updateField("buyerLastName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyerEmail">Email</Label>
                      <Input
                        id="buyerEmail"
                        type="email"
                        value={formData.buyerEmail}
                        onChange={(e) => updateField("buyerEmail", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="buyerPhone">Phone</Label>
                      <Input
                        id="buyerPhone"
                        type="tel"
                        value={formData.buyerPhone}
                        onChange={(e) => updateField("buyerPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Seller Information */}
                <div className="space-y-4">
                  <h4 className="font-medium text-orange-600">Seller Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="sellerFirstName">First Name *</Label>
                      <Input
                        id="sellerFirstName"
                        value={formData.sellerFirstName}
                        onChange={(e) => updateField("sellerFirstName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sellerLastName">Last Name *</Label>
                      <Input
                        id="sellerLastName"
                        value={formData.sellerLastName}
                        onChange={(e) => updateField("sellerLastName", e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="sellerEmail">Email</Label>
                      <Input
                        id="sellerEmail"
                        type="email"
                        value={formData.sellerEmail}
                        onChange={(e) => updateField("sellerEmail", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="sellerPhone">Phone</Label>
                      <Input
                        id="sellerPhone"
                        type="tel"
                        value={formData.sellerPhone}
                        onChange={(e) => updateField("sellerPhone", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder="Any additional information about this transaction..."
                  rows={4}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Create Transaction
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionForm;
