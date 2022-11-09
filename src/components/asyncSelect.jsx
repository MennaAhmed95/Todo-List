import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "@rjsf/material-ui";
import { TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";

const Form = withTheme(MuiTheme);

const AsyncCustomSelect = (props) => {
  console.log(props, "eman");
  const [value, setValue] = useState(props.multiple ? [] : "");
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((data) => setData(data.products));
  }, []);
  if (props.multiple) {
    let x = value.map((itm) => itm.title);
    props.onChange(x);
    props.schema.items.enum = x;
  } else props.onChange(value?.title);

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => {
        props.multiple
          ? setValue(newValue.map((option) => option.value || option))
          : setValue(newValue);
      }}
      id="combo-box-demo"
      options={data}
      multiple={props.multiple}
      // options={props.schema.items.enum}
      getOptionLabel={(option) => option.title || ""}
      style={{ width: 300, margin: "1rem" }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  );
};
const AsyncSelectWidget = () => {
  const widgets = {
    SelectWidget: AsyncCustomSelect,
  };
  const schema = {
    type: "object",
    properties: {
      //   oneSelect: {
      //     type: "string",
      //     title: "Select one",
      //   },
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
        // oneSelect: {
        //   "ui:widget": AsyncCustomSelect,
        // },
        multiSelect: { items: { "ui:widget": AsyncCustomSelect } },
      }}
      widgets={widgets}
      onSubmit={(e) => console.log("submitted", e.formData)}
    />
  );
};

export default AsyncSelectWidget;
