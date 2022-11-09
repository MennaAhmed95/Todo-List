import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "@rjsf/material-ui";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";
const Form = withTheme(MuiTheme);
const OneCustomSelect = (props) => {
  console.log(props, "one");
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setData(data.products));
  }, []);
  props.onChange(value?.title);
  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue);
      }}
      id="combo-box-demo"
      options={data}
      multiple={false}
      // options={props.schema.items.enum}
      getOptionLabel={(option) => option.title || ""}
      style={{ width: 300, margin: "1rem" }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  );
};
const OneSelect = () => {
  const widgets = {
    SelectWidget: OneCustomSelect,
  };
  const schema = {
    type: "object",
    properties: {
      oneSelect: {
        type: "string",
        title: "Select one",
      },
      // multiSelect: {
      //   type: "array",
      //   title: "Select multi",
      //   items: { type: "string", enum: [] },
      //   uniqueItems: true,
      // },
    },
  };
  return (
    <Form
      schema={schema}
      uiSchema={{
        oneSelect: {
          "ui:widget": OneCustomSelect,
        },
        // multiSelect: { items: { "ui:widget": "MultiCustomSelect" } },
      }}
      widgets={widgets}
      onSubmit={(e) => console.log("submitted", e.formData)}
    />
  );
};
export default OneSelect;
