import { ButtonElement, Element, FrameElement, ListElement } from "@/lib/type";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";

const commonStyles: CSSProperties = {
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export const listItemStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export const createElements = (
  name: string,
  dispatch: Function,
  x: number,
  y: number
) => {
  const baseElement = {
    id: `${name}-${uuidv4()}`,
    content: name,
    isSelected: false,
    x,
    y,
    styles: {
      ...commonStyles,
      height: "50px",
      width: "100px",
    },
  };

  switch (name) {
    case "ListItem": {
      const listElement: ListElement = {
        ...baseElement,
        type: "List",
        styles: {
          display: "flex",
          ...baseElement.styles,
          flexDirection: "column",
        },
        items: [
          {
            content: "Item 1",
            id: `Item-${uuidv4()}`,
            isSelected: false,
            styles: listItemStyles,
          },
          {
            content: "Item 2",
            id: `Item-${uuidv4()}`,
            isSelected: false,
            styles: listItemStyles,
          },
          {
            content: "Item 3",
            id: `Item-${uuidv4()}`,
            isSelected: false,
            styles: listItemStyles,
          },
        ],
      };
      dispatch({
        type: "ADD_ELEMENT",
        payload: listElement,
      });
      break;
    }

    case "Button": {
      const buttonElement: ButtonElement = {
        ...baseElement,
        type: "Button",
        styles: {
          ...baseElement.styles,
        },
      };
      dispatch({
        type: "ADD_ELEMENT",
        payload: buttonElement,
      });
      break;
    }
    case "Frame": {
      const element: FrameElement = {
        ...baseElement,
        type: "Frame",
        x: 0,
        y: 0,
        styles: {
          ...baseElement.styles,
          height: "200px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        },
        elements: [],
      };
      dispatch({
        type: "ADD_ELEMENT",
        payload: element,
      });
      break;
    }
    default: {
      const element: Element = {
        ...baseElement,
        type: name,
      };
      dispatch({
        type: "ADD_ELEMENT",
        payload: element,
      });
      break;
    }
  }
};
