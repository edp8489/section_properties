import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';
import React from 'react';

export default function InputsSection(props){
  const {fieldsSchema, uiSchema, submitFunction} = props
  const [formData, setFormData] = React.useState(null);
  return(
    <Form
    schema={fieldsSchema}
    uiSchema={uiSchema}
    validator={validator}
    formData={formData}
    onChange={(e) => {setFormData(e.formData)}}
    onSubmit={() => {submitFunction(formData)}}
    onError={(e) => console.log('errors')}
  />
  )
}