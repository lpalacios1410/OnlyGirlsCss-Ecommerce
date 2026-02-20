import { useState } from "react";

export function FiltersProducts({
  selectedColor: propSelectedColor = null,
  onColorChange = () => {},
  //Props Categories
  onCategoryChange,
  activeCategory,
}) {
  const colors = [
    { key: "wine", hex: "#A9597E" },
    { key: "pinklight", hex: "#F6D7E3" },
    { key: "gold", hex: "#F2D77E" },
    { key: "skylight", hex: "#8EDCE6" },
  ];

  const [selectedColor, setSelectedColor] = useState(colors[0].key);

  const categories = ["todos", "peluche", "bolso", "juguete", "termo"];

  return (
    <>
      <aside className="w-full xl:w-1/3 mb-8 lg:mb-0">
        <div className="p-6 rounded-lg bg-white border border-gray-200 shadow-lg">
          <div className="mb-6">
            <h1 className="font-semibold text-xl mb-3">Category</h1>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`flex flex-col cursor-pointer text-lg ${
                  activeCategory === cat
                    ? "font-bold underline underline-offset-1"
                    : "text-gray-500"
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div>
            <h3 className="font-semibold mb-3">Colors</h3>
            <div className="flex flex-wrap gap-3 w-full">
              {colors.map((color) => {
                const active = propSelectedColor ?? selectedColor;
                const isActive = active === color.key;

                const handleClick = () => {
                  if (propSelectedColor === null) setSelectedColor(color.key);
                  onColorChange(color.key);
                };

                return (
                  <button
                    key={color.key}
                    onClick={handleClick}
                    style={{ background: color.hex }}
                    className={`w-10 h-10 rounded-full transition-all duration-300 ${
                      isActive
                        ? "ring-2 ring-offset-2 ring-gray-500 scale-110"
                        : "hover:scale-105"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
