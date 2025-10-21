import Button from "../forms/button";

function PageHeaderComponent() {
  return (
    <section className="flex justify-between items-center pb-4">
      <div className="logo">
        <h1 className="text-lg font-bold">ShowVerse</h1>
      </div>
      <div className="flex gap-4 items-center">
        <Button icon className="flex items-center justify-center">
          <i className="text-xl icon-moon"></i>
        </Button>
        <Button primary>Contact me</Button>
      </div>
    </section>
  );
}

export default PageHeaderComponent;
