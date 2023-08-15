import "../styles/components/ContainerHeader.scss";

export default function ContainerHeader({ children, title }) {
  return (
    <div className="container-header">
      {title && <span className="container-header__title">{title}</span>}
      <div className="container-header__actions">{children}</div>
    </div>
  );
}
