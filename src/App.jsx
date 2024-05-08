import React, { useState, useRef } from "react";
import { useScreenshot } from "use-screenshot-hook";

export default function App() {
  const [images, setImages] = useState([]);
  const screenshotRef = useRef(null);
  const [name, setName] = useState("");
  const { image, takeScreenshot } = useScreenshot({
    ref: screenshotRef,
  });

  const handleClick = (char) => {
    const imageNumber = char.charCodeAt(0) - "a".charCodeAt(0) + 1;
    const imageSrc = `/${imageNumber}.png`;
    const rotation = getRandomRotation();
    setImages((prevImages) => [...prevImages, { src: imageSrc, rotation }]);
    setName((prevName) => prevName + char);
    console.log("name is:", name);
  };

  const getRandomRotation = () => {
    const degree = Math.floor(Math.random() * 9);
    return Math.random() > 0.5 ? degree : -degree;
  };

  const handleGenerate = () => {
    takeScreenshot().then((image) => {
      const a = document.createElement("a");
      a.href = image;
      a.download = "screenshot";
      a.click();
    });
  };

  return (
    <div className="flex flex-col bg-amber-100 items-center p-16 space-y-8 overflow-auto text-center">
      <span className="font-bold text-5xl text-slate-800">
        Flower Name Generator
      </span>

      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 border p-8 border-black">
          {(() => {
            const items = [];
            const letters = [
              "a",
              "b",
              "c",
              "d",
              "e",
              "f",
              "g",
              "h",
              "i",
              "j",
              "k",
              "l",
              "m",
              "n",
              "o",
              "p",
              "q",
              "r",
              "s",
              "t",
              "u",
              "v",
              "w",
              "x",
              "y",
              "z",
            ];
            for (let i = 0; i < letters.length; i++) {
              const letter = letters[i];
              items.push(
                <div
                  key={i}
                  className="card bg-white shadow-xl stack"
                  onClick={() => handleClick(letter)}
                >
                  <figure>
                    <img
                      className="w-64 h-64"
                      src={`${
                        letter.charCodeAt(0) - "a".charCodeAt(0) + 1
                      }.png`}
                      alt="Shoes"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title">{letter.toLocaleUpperCase()}</h2>
                  </div>
                </div>
              );
            }
            return items;
          })()}
        </div>
        <div className="flex flex-col items-center border p-8 border-black space-y-4 h-full mt-4 lg:mt-0">
          <span className="font-bold text-xl text-amber-950">
            {name.toUpperCase()}
          </span>
          <div className="mockup-phone border-primary">
            <div className="camera"></div>
            <div className="display">
              <div
                ref={screenshotRef}
                className="artboard artboard-demo phone-1 bg-white "
              >
                <div className="stack">
                  <img src={"vase1.png"} alt="Flower" />
                  {images.map((image, index) => (
                    <img
                      className="mb-[15vh]"
                      key={index}
                      src={image.src}
                      alt="Flower"
                      // style={{ transform: `rotate(${image.rotation}deg)` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleGenerate}>
            Generate
          </button>
        </div>
      </div>
    </div>
  );
}
