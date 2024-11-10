// src/utils/xlsxUtils.ts
import { utils, writeFile } from "xlsx";

export const generateXLSX = <T>(data: T[]) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Selected Items");
  writeFile(workbook, "selected-items.xlsx");
};
