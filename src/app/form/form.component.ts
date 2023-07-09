import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  
  registerForm!: FormGroup;
  guardarEmails: String[] =[""];
  emailCadastrado: String = '';
  emailAlerta: String = '';
  showPass: boolean = false;

  constructor(private formBuilder: FormBuilder){} // O FormBuilder gera controles de formulários e evita a criação manual de instâncias de controle.

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      senha:['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d).*$/)]]
    });
  }

  // Explicação do pattern - /^ : início dos caracteres; 
  // (?=.*[a-zA-Z]): lookahead positivo que verifica se existe uma letra minúscula ou maiúscula de caracteres;  
  // (?=.*\d): lookahead positivo que verifica se existe um dígito numérico na sequência de caracteres; 
  // .*: permite que haja outros caracteres além das letras e números;  
  // $/: fim dos caracteres.

  get nome(){
    return this.registerForm.get('nome')!;
  }

  get email(){
    return this.registerForm.get('email')!;
  }

  get senha(){
    return this.registerForm.get('senha')!;
  }

  //Envia o formulário
  submit(){

    if(this.registerForm.invalid){
      return;
    }
    console.log("Conta Cadastrada");
  }

  emailValidation(){
    const email = this.registerForm.value.email;

    if(this.guardarEmails.includes(email)){
    
      this.emailAlerta = "E-mail já cadastrado, por favor insira outro.";
      this.emailCadastrado = '';
    }else{

      this.guardarEmails.push(email);
      this.emailCadastrado = "Cadastro realizado com sucesso!"
      this.emailAlerta = '';
      this.registerForm.reset();
    }
  }

  cleanMessage(){
    this.emailAlerta = '';
    this.emailCadastrado = '';
  }

  cleanMessageNewRegister(){
    this.emailCadastrado = '';
  }

  // DUPLICATES EMAIL VALIDATION
    //Podemos customizar validações com o AbastractControl
   
    // emailValidator(control: AbstractControl){
    //   const email = control.value;

    //   if(this.guardarEmails.includes(email)){
    //     this.emailAlerta = "E-mail já cadastrado, por favor insira outro";
    //     return{duplicated: true}
    //   }else{
    //     return this.newEmail;
    //   }
    // }

    // newEmail(control:AbstractControl){
    //   const email = control.value;

    //   if(email != this.guardarEmails.includes(email)){
    //     this.guardarEmails.push(email);
    //     this.emailCadastrado = "Cadastrado realizado com sucesso!"
    //     this.registerForm.reset();
    //     return{newEmail: true}
    //   }else{
    //     return this.emailValidator
    //   }
    // }

  // PASSWORD VALIDATION
    //Podemos customizar validações com o AbastractControl
  
  // passValidator(control: AbstractControl) {
  //   const senha = control.value as string;

  //   if(senha!== senha?.toLowerCase() && senha!== senha?.toUpperCase()){
  //     return{minusculo: true, maiusculo: true}
  //   }else{
  //     return null;
  //   }
  // }

}

