import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./homepage";     
import Register from "./registrationpage";
import Login from "./loginpage";
import ForgotPassword from "./forgotpasswordpage";
import EnterOTP from "./enterotppage";
import Dashboard from "./dashboardpage";
import AdminLogin from "./adminlogin";
import Admin from "./adminpage";
import ManagerReport from "./managerreport";
import PatientApplications from "./patientApplication";
import Recommendation from "./recommendation";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reg" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/otp" element={<EnterOTP />} />
        <Route path="/dash" element={<Dashboard />}/>
        <Route path="/admin" element={<AdminLogin />}/>
        <Route path="/admpage" element={<Admin />}/>
        <Route path="/manarep" element={<ManagerReport />}/>
        <Route path="/patient" element={<PatientApplications />}/>
        <Route path="/recommendation" element={<Recommendation />}/>

        
      </Routes>
    </BrowserRouter>
  );
}

export default App;