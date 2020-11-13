import React from 'react';
import ScriptTag from 'react-script-tag';

class ContactFormGadget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {formSuccessfullySubmitted: false};
        this.formGadgetPostValidate = this.formGadgetPostValidate.bind(this);
        this.formGadgetPreSubmit = this.formGadgetPreSubmit.bind(this);
        this.formGadgetPostSubmit = this.formGadgetPostSubmit.bind(this);
    }

    formGadgetPostValidate(event) {
        /* An event is fired after the form has been validated.  It is possible to add custom validations by listening for the event and changing the event.details object. All events include a reference to the form as well. */
        console.log('form-gadget-post-validate event', event);
    }

    formGadgetPreSubmit(event) {
        /* An event is fired before the AJAX request.  It's possible to change the request body by changing the data attribute in the event.detail.data object. */
        console.log('form-gadget-pre-submit event', event);
    }

    formGadgetPostSubmit(event) {
        /* An event is fired after the AJAX request has been completed.  The event will include the request and response object, so it will be possible to show success or failure messages.  By default the Javascript will attempt to place an error message string inside an html element inside the form that has a 'form-gadget-form-error' class. */
        console.log('form-gadget-post-submit [event]', event);
        if(event.detail.request.status === 201) {
            event.detail.form.remove();
            this.setState(state => ({
              formSuccessfullySubmitted: true
            }));
        }
    }

    componentDidMount() {
        console.log('componentDidMount');
        document.addEventListener('form-gadget-post-validate', this.formGadgetPostValidate);
        document.addEventListener('form-gadget-pre-submit', this.formGadgetPreSubmit);
        document.addEventListener('form-gadget-post-submit', this.formGadgetPostSubmit);

    }

    componentWillUnmount() {
        console.log('componentWillUnmount');
        document.removeEventListener('form-gadget-post-validate', this.formGadgetPostValidate);
        document.removeEventListener('form-gadget-pre-submit', this.formGadgetPreSubmit);
        document.removeEventListener('form-gadget-post-submit', this.formGadgetPostSubmit);
    }

    render() {
        const formGadgetSrcUrl = 'https://www.formgadget.com/static/dist/formgadget.js?formId=' + this.props.formId;
        //outer container div is required so that form is properly unmounted
        return (
            <div>
                {this.state.formSuccessfullySubmitted
                    ? <h3>Form Submitted</h3>
                    : <ScriptTag isHydrating={false} type='text/javascript' src={formGadgetSrcUrl} />
                }
            </div>
        );
    }
}

export default ContactFormGadget;