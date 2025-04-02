import { Route, Routes } from "react-router-dom";
import Splashscreen from "../../componants/splash/splashscreen";
import Details from "../../componants/details/details";
import Upload from "../../componants/upload/upload";
import Disease from "../../componants/disease/Disease";
import WebcamCapture from "../../componants/webCam/WebcamCapture";
import AccountDestils from "../../componants/accountDetails/AccountDestils";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`/Splash`} element={<Splashscreen />} />
      <Route path={`/details`} element={<Details />} />
      <Route path={`/`} element={<Upload />} />
      <Route path={`/disease`} element={<Disease />} />
      <Route path={`/web`} element={<WebcamCapture />} />
      <Route path={`/profile`} element={< AccountDestils/>} />
    </Routes>
  );
};

export default AppRoutes;
