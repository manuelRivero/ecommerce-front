"use client"
import { Button } from "@mui/material";
import React from "react";

const Options = ({ actionProvider, options }: any) => {
    console.log("actionProvider", actionProvider.handleMainTopicSelection)
    const handleOptionClick = (id: string) => {
        actionProvider.handleMainTopicSelection(id);
      };
  return (
    <div className="options-container">
      {options.map((option: any) => (
        <Button variant="contained" sx={{margin: 1}} key={option.id} onClick={()=> handleOptionClick(option.id)}>
          {option.text}
        </Button>
      ))}
    </div>
  );
};

export default Options;
