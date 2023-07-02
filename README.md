# proje-react-form

Simple Form management library for React. You can also use it with React Native.

# Installation
```
    yarn add proje-react-form
    npm i proje-react-form
```
# Quick Features
- Simple Form with web elements
- Custom components that can easily be used with vendors (react-select) or React Native
- Simple and customizable validation structure
- Async validation for specially server side requests
- Async submit for specially server side requests
- Confirm condition (you can show modal/popup and wait for answer)
- Input updates type (immediately, on blur, debounce)
- Without context (like react-hook-form)
- Submit conditions (like submit after 3 validation error)
- Watch input easily for create password / repeat password, slug generator, calculator forms

You can find all features on examples project;</br>
https://github.com/demirsefa/proje-react-form/tree/main/examples

# Get Started

```tsx
import React from "react";
import { FormRefreshType, FormShouldValidateType, FormError, InputError, Form, Input } from "proje-react-form";

export default function SimpleForm() {
    return (
        <Form
            formBaseOptions={{
                refreshType: FormRefreshType.blur,
                shouldValidate: FormShouldValidateType.AFTER_FIRST_SUBMIT_ATTEMPT,
                dev:false // You can open logs     
            }}
            onSubmit={(data) => {
                console.info("Name: ",data.name);
                console.info("Surname: ",data.lastname);
                console.info("Email: ",data.email);
            }}>
        <FormError />
        <div>
            <label>Name</label>
            <Input validation={(v) => v.required().minLength(2)} name={"name"} />
            <InputError name={"name"} />
        </div>
        <div>
            <label>Last Name</label>
            <Input validation={(v) => v.set({ validateAll: true }).minLength(2)} name={"lastname"} />
            <InputError name={"lastname"} />
        </div>
        <div>
            <label>Email</label>
            <Input validation={(v) => v.email()} name={"email"} />
            <InputError name={"email"} />
        </div>
        <button>SEND</button>
    </Form>);
}
```
