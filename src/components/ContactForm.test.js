import React from "react";
import {act} from 'react-dom/test-utils';
import { render, fireEvent, wait } from "@testing-library/react";
import ContactForm from "./ContactForm";

test('renders correctly', () => {
    render(<ContactForm />);
})

test('Contact form sumbits with data provided', async () => {
    let util;
    act(() => {
        util = render(<ContactForm />);
    })
    
    const firstNameInput = util.getByLabelText(/first/i);
    const lastNameInput = util.getByLabelText(/last/i);
    const email = util.getByLabelText(/email/i)
    const message = util.getByLabelText(/message/i)

    fireEvent.change(firstNameInput, {target: { name: 'firstName', value: 'Anthony'}})
    fireEvent.change(lastNameInput, {target: { name: 'lastName', value: 'Kawa'}})
    fireEvent.change(email, {target: { name: 'email', value: 'anthonyk2020@gmail.com'}})
    fireEvent.change(message, {target: { name: 'message', value: 'How do I make this form work?'}})

    const form = util.getByRole('form');
    act(() => {
       fireEvent.submit(form); 
    })

    const test = await util.findByText(/anthony/i)
    
    expect(test.textContent).toEqual(
`{
  "firstName": "Anthony",
  "lastName": "Kawa",
  "email": "anthonyk2020@gmail.com",
  "message": "How do I make this form work?"
}`)  

})


test('there are 3 input fields that are required', async () => {
    let util;
    act(() => {
        util = render(<ContactForm />);
    })
    
    const firstNameInput = util.getByLabelText(/first/i);
    const lastNameInput = util.getByLabelText(/last/i);
    const email = util.getByLabelText(/email/i)

    fireEvent.change(firstNameInput, {target: { name: 'firstName', value: ''}})
    fireEvent.change(lastNameInput, {target: { name: 'lastName', value: ''}})
    fireEvent.change(email, {target: { name: 'email', value: ''}})

    const form = util.getByRole('form');
    act(() => {
       fireEvent.submit(form); 
    })

    const test = await util.findAllByText(/Looks like there was an error: required/i)
    expect(test.length).toEqual(3); 
})

test('all input fields should be reset when submitted', async () => {
    let util;
    act(() => {
        util = render(<ContactForm />);
    })
    
    const firstNameInput = util.getByLabelText(/first/i);
    const lastNameInput = util.getByLabelText(/last/i);
    const email = util.getByLabelText(/email/i)
    const message = util.getByLabelText(/message/i)

    fireEvent.change(firstNameInput, {target: { name: 'firstName', value: 'Anthony'}})
    fireEvent.change(lastNameInput, {target: { name: 'lastName', value: 'Kawa'}})
    fireEvent.change(email, {target: { name: 'email', value: 'anthonyk2020@gmail.com'}})
    fireEvent.change(message, {target: { name: 'message', value: 'How do I make this form work?'}})

    const form = util.getByRole('form');
    act(() => {
       fireEvent.submit(form); 
    })

    await wait(() => {
        expect(firstNameInput.value).toEqual('');
        expect(lastNameInput.value).toEqual('');
        expect(email.value).toEqual('');
        expect(message.value).toEqual('');
    })
    
})