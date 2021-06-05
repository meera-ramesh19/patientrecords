document.addEventListener('DOMContentLoaded', () => {
    const submitForm = document.querySelector('#add-patient-form');
    const updateForm = document.querySelectorAll('form.update-patient-form');
    const deleteBtn = document.querySelectorAll('.del')

    if (submitForm) {
        submitForm.addEventListener('submit', handleFormSubmit);
    }

    if (updateForm) {
        Array.from(updateForm).forEach((el) => {
            el.addEventListener('submit', updatePatient)
        })
    }

    if (deleteBtn) {
        Array.from(deleteBtn).forEach((el) => {
            el.addEventListener('click', deletePatient)
        })
    }
});


// Show a notification if required fields haven't been filled
function handleFormSubmit(event) {
    const required = ['patname', 'patDob', 'docPracticeName', 'docName',
        'docAdd', 'docSpecialize', 'docGender', 'docVisitDate', 'docInNetwork',
        'docCopay', 'docInstructions', 'patAilment', 'lat ', 'lon '
    ];

    const inputs = event.target.querySelectorAll('input[name], select[name] ,textarea[name]');
    const errors = [];

    for (const input of inputs) {
        const isRequired = required.includes(input.name);
        const isEmpty = input.value === '';

        if (isRequired && isEmpty) {
            errors.push(input.name);
        }
    };

    if (errors.length > 0) {
        event.preventDefault();
        if (errors.includes('lat') || errors.includes('lon')) {
            notify(`Error, please select a location on the map`);
        } else {
            // Image is called 'file' so we need to replace it
            // const fileIndex = errors.indexOf('file');
            // if (fileIndex !== -1) {
            //     errors[fileIndex] = 'image';
            // }

            notify(`Error, the following fields cannot be empty: ${errors.join(', ')}`);
        }
    }
};

function notify(text) {
    const notification = document.querySelector('.notification');

    notification.textContent = text;
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000, notification);
}


// Update submitted patients
async function updatePatient(event) {
    event.preventDefault();

    const fields = Array.from(event.target.querySelectorAll('input[name], textarea[name], select[name]'));
    const patientIndex = fields.findIndex(field => field.name === 'id');
    const patientId = fields.splice(patientIndex, 1)[0].value;
    const requestBody = Object.fromEntries(fields.map(field => {
        return [field.name, field.value]
    }))

    try {
        const response = await fetch(`/patients/updatePatient/${patientId}`, {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(requestBody),
        })
        location.replace(`/patients/${patientId}`);
    } catch (err) {
        console.error(err)
    }
}


// Delete submitted patients

async function deletePatient(event) {
    const patient = event.currentTarget.closest('[data-id]');
    const patientId = patient.dataset.id;
    const page = new URL(window.location);

    try {
        const response = await fetch(`/patients/deletePatient/${patientId}`, {
            method: 'DELETE',
        });
        const data = await response;


        if (page.pathname.startsWith('/patients/')) {
            location.replace('/profile');
        } else {
            location.reload();
        }
    } catch (err) {
        console.error(err)
    }
}