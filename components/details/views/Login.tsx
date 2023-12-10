import YesNoTag from "@/components/YesNoTag";
import { Panel } from "primereact/panel";

const LoginViewDetails = ({ viewDetails }: { viewDetails: any }) => {
  // show:
  // allowed_profiles
  // submit_button_text
  // description

  return (
    <div className="grid metadata">
      <Panel header="Key">
        <p>{viewDetails.key}</p>
      </Panel>
      <Panel header="Type">
        <p>{viewDetails.type}</p>
      </Panel>
      <Panel header="Registration Type">
        <p>{viewDetails?.registration_type}</p>
      </Panel>
      <Panel header="SSO Facebook">
        <YesNoTag value={viewDetails.sso_facebook} />
      </Panel>
      <Panel header="SSO Google">
        <YesNoTag value={viewDetails.sso_google} />
      </Panel>
      <Panel header="SSO OpenID">
        <YesNoTag value={viewDetails.sso_openid} />
      </Panel>
      <Panel header="SSO Twitter">
        <YesNoTag value={viewDetails.sso_twitter} />
      </Panel>
      <Panel header="Submit Button Text">
        <p>{viewDetails?.submit_button_text}</p>
      </Panel>
      <Panel header="Description">
        <p>{viewDetails?.description}</p>
      </Panel>
    </div>
  );
};

export default LoginViewDetails;
