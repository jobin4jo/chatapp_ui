import { Routes } from '@angular/router';
import { LoginComponent } from './Components/Login/login/login.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { ChatUIComponent } from './Components/chat-ui/chat-ui.component';
import { PaymentSuccessComponent } from './Common/Components/payment-success/payment-success.component';
import { PaymentFailureComponent } from './Common/Components/payment-failure/payment-failure.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'list', component: UserListComponent },
    { path: 'chat', component: ChatUIComponent },
    { path: "success", component: PaymentSuccessComponent },
    { path: "failure", component: PaymentFailureComponent }
];
