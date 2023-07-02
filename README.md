# 


Simple Form management library for React. You can also use it with React Native.

# Example

```
import React from "react";
import { FormRefreshType, FormShouldValidateType, FormError, InputError, Form, Input } from "proje-react-form";

export default function SimpleForm() {
    return (
        <Form
            formBaseOptions={{
            refreshType: FormRefreshType.blur,
            shouldValidate: FormShouldValidateType.AFTER_FIRST_SUBMIT_ATTEMPT,
        }}
        onSubmit={(data) => {}}>
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
</Form>
);
}
```
