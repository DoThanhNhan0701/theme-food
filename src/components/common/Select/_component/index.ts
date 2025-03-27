import { OptionType } from "..";

export const normalizeText = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

export const filterByNormalizedText = (
  input: string,
  option?: OptionType,
  optionData?: OptionType[]
) => {
  if (!option?.label) return false;
  if (!input && option.value === "all") return true;
  const normalizedInput = normalizeText(input);
  const normalizedLabel = normalizeText(option.label.toString());

  const isMatch = normalizedLabel.includes(normalizedInput);
  if (option.value === "all") {
    return (optionData ?? []).some((opt) =>
      normalizeText(opt.label as string).includes(normalizedInput)
    );
  }
  return isMatch;
};
