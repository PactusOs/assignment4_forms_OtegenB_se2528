
function check(form){
  if(form.id==="form4"){
    let a=form.querySelector("#password");
    let b=form.querySelector("#confirmPassword");
    b.setCustomValidity(b.value!==a.value?"Passwords do not match.":"");
  }
  let good=true;
  form.querySelectorAll(".form-control,.form-select").forEach(function(a){
    let ok=a.checkValidity();
    a.classList.toggle("is-valid",ok);
    a.classList.toggle("is-invalid",!ok);
    let msg=a.parentElement.querySelector(".invalid-feedback");
    if(msg&&!ok)msg.textContent=a.validationMessage;
    if(!ok)good=false;
  });
  if(form.id==="form4"){
    ["gender","hobby"].forEach(function(name){
      let ok=!!form.querySelector('[name="'+name+'"]:checked');
      form.querySelector('[data-error="'+name+'"]').hidden=ok;
      form.querySelector('[data-success="'+name+'"]').hidden=!ok;
      if(!ok)good=false;
    });
  }
  return good;
}
document.querySelectorAll("form").forEach(function(form){
  let status=form.querySelector(".form-status");
  form.addEventListener("submit",function(e){
    e.preventDefault();
    let ok=form.id==="form3"||form.id==="form4"?check(form):form.checkValidity();
    status.hidden=false;
    status.className="form-status mt-3 alert "+(ok?"alert-success":"alert-danger");
    status.textContent=ok?"Form is valid. Demo only: no data was sent.":"Please fix the highlighted fields.";
  });
  if(form.id==="form3"||form.id==="form4"){
    form.addEventListener("input",function(){
      check(form);
      status.hidden=true;
    });
    form.addEventListener("change",function(){
      check(form);
      status.hidden=true;
    });
    form.addEventListener("reset",function(){
      form.querySelectorAll(".is-valid,.is-invalid").forEach(function(a){
        a.classList.remove("is-valid","is-invalid");
      });
      form.querySelectorAll(".group-error,.group-success").forEach(function(a){
        a.hidden=true;
      });
      if(form.id==="form4")form.querySelector("#confirmPassword").setCustomValidity("");
      status.hidden=true;
    });
  }
});
