import { withTheme } from "react-jsonschema-form";
import { Theme as MuiTheme } from "@rjsf/material-ui";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles,
  StylesProvider,
} from "@material-ui/core";
import { useState } from "react";
// import "./index.css";
const Form = withTheme(MuiTheme);

function RJSC() {
  const jsonSchema = {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      password: { type: "string" },
      firstName: {
        type: "string",
        title: "First name",
        default: "Chuck",
      },
      lastName: {
        type: "string",
        title: "Last name",
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10,
      },
    },
  };
  const uiSchema = {
    "ui:order": ["firstName", "lastName", "password", "*"],
    firstName: {
      "ui:autofocus": true,
      "ui:emptyValue": "",
      "ui:autocomplete": "family-name",
    },
    lastName: {
      "ui:emptyValue": "",
      "ui:autocomplete": "given-name",
    },
    age: {
      "ui:widget": "updown",
      "ui:title": "Age of person",
      "ui:description": "(earthian year)",
    },
    bio: {
      "ui:widget": "textarea",
    },
    password: {
      "ui:widget": "password",
      // "ui:help": "Hint: Make it strong!",
    },
    date: {
      "ui:widget": "alt-datetime",
    },
    telephone: {
      "ui:options": {
        inputType: "tel",
      },
    },
  };
  const formData = {
    firstName: "Chuck",
    lastName: "Norris",
    age: 75,
    bio: "Roundhouse kicking asses since 1940",
    password: "noneed",
  };
  const schem = {
    type: "object",
    properties: {
      name: {
        type: "string",
      },
    },
    additionalProperties: {
      type: "number",
      enum: [1, 2, 3],
    },
  };
  ////////////styles/////////
  const useStyles = makeStyles((theme) => ({
    createStyles: {
      myApp: {
        "& > div:first-child": {
          background: "red",
        },
      },
    },
  }));
  const classes = useStyles();
  /*************************/
  // const schema = {
  //   type: "boolean",
  //   default: true,
  // };
  // // {
  // //   type: "array",
  // //   title: " المميزات ",
  // //   items: {
  // //     type: "string",
  // //     enum: ["foo1", "bar1", "fuzz1", "qux1"],
  // //   },
  // //   uniqueItems: true,
  // // };
  // const ui = {
  //   "ui:widget": "checkbox",
  // };

  // const CustomCheckbox = function (props) {
  //   console.log(props, "prrrop");
  //   return (
  //     <FormControlLabel
  //       control={<Checkbox style={{ color: "black" }} name={props.value} />}
  //       label="uiop"
  //     />
  //   );
  // };

  // const widgets = {
  //   CheckboxWidget: CustomCheckbox,
  // };
  /************************* */
  const CustomCheckbox = (props) => {
    console.log(props, "prop");
    return (
      <>
        <label>{props.label}</label>
        <Grid container style={{ maxWidth: "80%", margin: "0 auto" }}>
          {props.schema.items.enum.map((item, index) => (
            <Grid item xs={4} key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(event) => props.onChange(event.target.value)}
                    style={{ color: "black" }}
                    // checked={checked}
                    name={item}
                    value={item}
                  />
                }
                label={item}
              />
            </Grid>
          ))}
        </Grid>
      </>
    );
  };

  //  {
  //   type: "object",
  //   properties: {
  //     multipleChoicesList: {
  //       type: "array",
  //       title: "A multiple choices list",
  //       items: {
  //         type: "string",
  //         enum: ["foo", "bar", "fuzz", "qux"],
  //       },
  //       uniqueItems: true,
  //     },
  //   },
  // };
  const schema = {
    type: "array",
    title: "A multiple-choice list",
    items: {
      type: "string",
      enum: [
        "foo",
        "bar",
        "fuzz",
        "qux",
        "foo1",
        "bar1",
        "fuzz1",
        "qux1",
        "foo11",
        "bar12",
        "fuzz12",
        "qux12",
      ],
    },
    uniqueItems: true,
  };

  const ui = {
    "ui:widget": CustomCheckbox,
  };

  // const widgets = {
  //   CheckboxesWidget: CustomCheckbox,
  // };

  ///////////////////////////
  return (
    <div className={classes.myApp}>
      <h3 style={{ textAlign: "center" }}>React JSON Schema</h3>
      {/* <Form
        schema={jsonSchema}
        uiSchema={uiSchema}
        onChange={console.log("changed")}
        onSubmit={(e) => console.log("submitted", e)}
        onError={console.log("errors")}
        formData={formData}
      /> */}
      {/* <StylesProvider injectFirst> */}
      <Form
        className="customCheckbox"
        // className={classes.root}
        schema={schema}
        // uiSchema={ui}
        uiSchema={{
          "ui:widget": "checkboxes",
          // "ui:field": CustomCheckbox,
          // "ui:ArrayFieldTemplate": CustomCheckbox
          // "ui:FieldTemplate": CustomCheckbox,
        }}
        // templates={{ CustomCheckbox }}
        // widgets={widgets}

        onChange={(e) => console.log("onChange", e)}
        onSubmit={(e) => console.log("submitted", e.formData)}
      />
      {/* </StylesProvider> */}
      <Form
        schema={schema}
        // uiSchema={ui}
        uiSchema={{
          "ui:widget": "checkboxes",
          // "ui:field": CustomCheckbox,
          // "ui:ArrayFieldTemplate": CustomCheckbox
          // "ui:FieldTemplate": CustomCheckbox,
        }}
        // templates={{ CustomCheckbox }}
        // widgets={widgets}

        onChange={(e) => console.log("onChange", e)}
        onSubmit={(e) => console.log("submitted", e.formData)}
      />
    </div>
  );
}

export default RJSC;
