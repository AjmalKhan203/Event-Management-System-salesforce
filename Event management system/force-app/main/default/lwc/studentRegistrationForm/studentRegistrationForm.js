import { LightningElement, track, wire } from 'lwc';
import getEvents from '@salesforce/apex/StudentRegistrationController.getEvents';
import registerStudent from '@salesforce/apex/StudentRegistrationController.registerStudent';

export default class StudentRegistrationForm extends LightningElement {
    @track studentName = '';
    @track studentEmail = '';
    @track studentDepartment = '';
    @track selectedEventId = '';
    @track eventOptions = [];
    @track successMessage = '';
    @track errorMessage = '';
    @track loading = false;

    // Fetch available events
    @wire(getEvents)
    wiredEvents({ error, data }) {
        if (data) {
            this.eventOptions = data.map(ev => ({
                label: `${ev.Name} (${ev.Date__c})`,
                value: ev.Id
            }));
        } else if (error) {
            this.errorMessage = 'Error loading events';
            console.error(error);
        }
    }

    handleInputChange(event) {
        const field = event.target.dataset.field;
        if (field === 'studentName') {
            this.studentName = event.target.value;
        } else if (field === 'studentEmail') {
            this.studentEmail = event.target.value;
        } else if (field === 'studentDepartment') {
            this.studentDepartment = event.target.value;
        }
    }

    handleEventChange(event) {
        this.selectedEventId = event.detail.value;
    }

    handleSubmit() {
        this.successMessage = '';
        this.errorMessage = '';

        if (!this.studentName || !this.studentEmail || !this.selectedEventId) {
            this.errorMessage = 'Please fill all required fields.';
            return;
        }

        this.loading = true;
        registerStudent({
            name: this.studentName,
            email: this.studentEmail,
            department: this.studentDepartment,
            eventId: this.selectedEventId
        })
        .then(() => {
            this.successMessage = 'Registration successful! Confirmation email will be sent.';
            this.studentName = '';
            this.studentEmail = '';
            this.studentDepartment = '';
            this.selectedEventId = '';
        })
        .catch(error => {
            console.error(error);
            this.errorMessage = error.body ? error.body.message : error.message;
        })
        .finally(() => {
            this.loading = false;
        });
    }
}
