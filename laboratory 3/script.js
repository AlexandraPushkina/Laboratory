// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        const emailInput = document.getElemenetByID('InputEmail')
        const passwordInput = document.getElemenetByID('InputPassword');
        const numberInput = document.getElemenetByID('InputNumber');
        const ageInput = document.getElemenetByID('InputAge');
        const regexPatternEmail =/(?:[a-z0-9!#$%&*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&*+/=?^_{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gm;      
        const regexPatternNumber = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{10}$/gm;

        let isValidEmail = regexPatternEmail.test(emailInput.value);
        let isValidPassword = passwordInput.value.length < 4;
        let isValidNumber = regexPatternNumber.test(numberInput.value);
        let isValidAge = parseInt(ageInput.value) < 18 || parseInt(ageInput.value) > 90;

        if ( !isValidEmail || !isValidPassword || !isValidNumber || !isValidAge )  {
            event.preventDefault()
            event.stopPropagation();
            if (!isValidEmail){
                emailInput.classList.add('is-invalid');
                emailInput.classList.remove('is-valid');
            }
            if (!isValidPassword){
                passwordInput.classList.add('is-invalid');
                passwordInput.classList.remove('is-valid');
            }
            if (!isValidNumber){
                numberInput.classList.add('is-invalid');
                numberInput.classList.remove('is-valid');
            }
            if (!isValidAge){
                ageInput.classList.add('is-invalid');
                ageInput.classList.remove('is-valid');
            }
        }
        else
            form.classList.add('was-validated')
      }, false)
    });
  })();