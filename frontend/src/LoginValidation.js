function validation(values){
    let error ={}
    if (values.email.trim()==="")
    {
        error.email ="email should not be empty"

    }
    else{
        error.email=""
    }
    if (values.password.trim()==="")
        {
            error.password ="password should not be empty"
    
        }
        else{
            error.password=""
        }

        return error;
}
export default validation