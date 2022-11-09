import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "@rjsf/material-ui";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";

const Form = withTheme(MuiTheme);

const MultiCustomSelect = (props) => {
  console.log(props, "multi");
  const [value, setValue] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setData(data.products));
  }, []);

  let x = value.map((itm) => itm.title);
  props.onChange(x);
  props.schema.items.enum = x;

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => {
        setValue(newValue.map((option) => option.value || option));
      }}
      multiple={true}
      id="combo-box-demo"
      options={data}
      // options={props.schema.items.enum}
      getOptionLabel={(option) => option.title || ""}
      style={{ width: 300, margin: "1rem" }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  );
};

const MultiSelect = () => {
  const widgets = {
    SelectWidget: MultiCustomSelect,
  };

  const schema = {
    type: "object",
    properties: {
      // oneSelect: {
      //   type: "string",
      //   title: "Select one",
      // },
      multiSelect: {
        type: "array",
        title: "Select multi",
        items: { type: "string", enum: [] },
        uniqueItems: true,
      },
    },
  };

  return (
    <Form
      schema={schema}
      uiSchema={{
        multiSelect: { items: { "ui:widget": "MultiCustomSelect" } },
      }}
      widgets={widgets}
      onSubmit={(e) => console.log("submitted", e.formData)}
    />
  );
};

export default MultiSelect;
