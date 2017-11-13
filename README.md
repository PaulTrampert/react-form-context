# react-form-context
Form validation and context library for React.


## Usage
### Making a FormContextAware component
* Your component should accept props for `isSubmitting` and `hasSubmitted` (both boolean values).
```js
const MyComponent = ({isSubmitting, hasSubmitted, ...rest}) => {
  //Component render code
}
```
* Then, just wrap your component in the `formContextAware` HOC.
```js
import { formContextAware } from 'react-form-context';
// Other imports...

const MyComponent = ({isSubmitting, hasSubmitted, ...rest}) => {
  //Component render code
}

export default formContextAware(MyComponent);
```

### Making a validated component
* Your component should accept props for `validationErrors` (an array of strings) and `isValidating` (a boolean value).
```js
const MyComponent = ({validationErrors, isValidating, ...rest}) => {
  //Component render code
}
```

* Then, just wrap your component in the `withValidation` HOC.
```js
import { withValidation } from 'react-form-context';
// Other imports...

const MyComponent = ({validationErrors, isValidating, ...rest}) => {
  //Component render code
}

export default withValidation(MyComponent);
```

### Using wrapped components
* The included `Form` element creates the context required for `withValidation` and `formContextAware`.
* To use a component wrapped with one of these HOC's, just make sure they are nested within `<Form></Form`.
```js
import { Form } from 'react-form-context';
// Valid
<Form>
  <MyComponent />
</Form>

//Invalid
<MyComponent />
```
