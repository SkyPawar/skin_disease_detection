import { Route, Routes } from "react-router-dom";
import Splashscreen from "../../componants/splash/splashscreen";
import Details from "../../componants/details/details";
import Upload from "../../componants/upload/upload";
import Disease from "../../componants/disease/Disease";
import WebcamCapture from "../../componants/webCam/WebcamCapture";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={`/`} element={<Splashscreen />} />
      <Route path={`/details`} element={<Details />} />
      <Route path={`/upload`} element={<Upload />} />
      <Route path={`/disease`} element={<Disease />} />
      <Route path={`/web`} element={<WebcamCapture />} />
    </Routes>
  );
};

export default AppRoutes;
