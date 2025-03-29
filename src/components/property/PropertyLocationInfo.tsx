
import { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn, useWatch } from "react-hook-form";
import { PropertyFormValues, countryOptions } from "./propertyFormConfig";
import { LocationType } from "@/types/property";

interface PropertyLocationInfoProps {
  form: UseFormReturn<PropertyFormValues>;
}

const PropertyLocationInfo = ({ form }: PropertyLocationInfoProps) => {
  const country = useWatch({
    control: form.control,
    name: "country",
    defaultValue: "usa" as LocationType
  });

  const getStateLabel = () => country === "usa" ? "State" : "County";
  const getZipLabel = () => country === "usa" ? "ZIP Code" : "Postcode";
  const getStatePlaceholder = () => country === "usa" ? "NY" : "Greater London";
  const getZipPlaceholder = () => country === "usa" ? "10001" : "SW1A 1AA";
  
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <Select 
              onValueChange={field.onChange} 
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a country" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {countryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder={country === "usa" ? "New York" : "London"} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getStateLabel()}</FormLabel>
              <FormControl>
                <Input placeholder={getStatePlaceholder()} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{getZipLabel()}</FormLabel>
              <FormControl>
                <Input placeholder={getZipPlaceholder()} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default PropertyLocationInfo;
