import { LoginConfig } from "./login-form"
import { FormConfigs } from "../../types/form-generator"
import { AccountRegisterConfig } from "./account-register-form"
import { BorrowerRegisterConfig } from "./borrower-register-form"
import { BorrowerAddressConfig } from "./borrower-address-form"

export const FORMS : {[key:string] : FormConfigs<string>} = {
    'login_form' : LoginConfig,
    'account_register_form' : AccountRegisterConfig,
    'borrower_register_form' : BorrowerRegisterConfig,
    'borrower_address_form' : BorrowerAddressConfig
}


