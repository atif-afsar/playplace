import Button from "../ui/Button";
import CTABand from "../ui/CTABand";

export default function FranchiseCTA({
  title = "Let’s build the future of preschool learning together",
  text = "Interested in opening a Play Place preschool? We’d love to talk.",
}) {
  return (
    <CTABand
      title={title}
      text={text}
      actions={
        <>
          <Button to="/franchise#enquiry" variant="light" size="lg">
            Enquire about a franchise
          </Button>
          <Button to="/contact" variant="glass" size="lg">
            Contact us
          </Button>
        </>
      }
    />
  );
}
