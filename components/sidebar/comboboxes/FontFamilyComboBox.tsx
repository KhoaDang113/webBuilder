import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Element } from "@/lib/type";
import { useEditorContext } from "@/lib/context";
import { loadFont } from "@/app/utils/LoadFont";

type Props = {
  selectedElement: Element | null;
  selectedElements: Element[];
  fontFamilies: string[];
};

const FontFamilyComboBox = (props: Props) => {
  const { selectedElement, selectedElements, fontFamilies } = props;
  const [open, setOpen] = useState(false);
  const [selectedFontFamily, setSelectedFontFamily] = useState<string | null>(
    null
  );

  const { dispatch } = useEditorContext();

  useEffect(() => {
    if (selectedElement) {
      const fontFamily = selectedElement.styles?.fontFamily;
      setSelectedFontFamily(fontFamily || null);
    }
  }, [selectedElement]);

  const handleSelect = (selectedFamily: string) => {
    setSelectedFontFamily(selectedFamily);
    loadFont(selectedFamily);
    if (selectedElement) {
      selectedElements.forEach((element) => {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: element.id,
            updates: {
              styles: {
                ...element.styles,
                fontFamily: selectedFamily,
              },
            },
          },
        });
      });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {selectedFontFamily || "Select font family"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search font family..." />
          <CommandList>
            <CommandEmpty>No font family found.</CommandEmpty>
            <CommandGroup>
              {fontFamilies.map((family) => (
                <CommandItem
                  key={family}
                  value={family}
                  onSelect={() => {
                    handleSelect(family);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedFontFamily === family
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />

                  <span style={{ fontFamily: `'${family}', sans` }}>
                    {family}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FontFamilyComboBox;
