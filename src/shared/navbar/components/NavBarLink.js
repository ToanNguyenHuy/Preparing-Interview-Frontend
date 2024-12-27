import Link from "next/link";

export default function NavBarLink({
  href,
  title,
  isSelected,
  handleChangePage,
  ...props
}) {
  const onChangePage = function () {
    if (typeof handleChangePage === "function") {
      handleChangePage();
    } else {
      console.error("NavBarLink: handleChangePage is not a function");
    }
  };

  const normalStyle = "text-slate-800 hover:text-sky-600";
  const selectedStyle =
    "text-slate-900 font-semibold border-b-2 border-slate-900";

  return (
    <Link
      className={` mr-2 flex flex-row items-center text-center px-2 py-auto ${
        isSelected ? selectedStyle : normalStyle
      }`}
      href={href}
      onClick={onChangePage}
    >
      {title}
    </Link>
  );
}
