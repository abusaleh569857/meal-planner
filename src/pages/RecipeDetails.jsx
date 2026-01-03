import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRecipeDetails from "../hooks/useRecipeDetails";
import MealPlanModal from "../components/MealPlanModal";
import DataHandler from "../utils/DataHandler";
import {
  FaArrowLeft,
  FaUtensils,
  FaPlay,
  FaCalendarPlus,
} from "react-icons/fa";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipeDetails, loading, error } = useRecipeDetails(id);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getYoutubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = recipeDetails?.video
    ? getYoutubeId(recipeDetails.video)
    : null;
  const videoThumbnail = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : recipeDetails?.thumb;

  const instructionsList = recipeDetails?.instruction
    ? recipeDetails.instruction
        .split(/\r\n|\n/)
        .filter((line) => line.trim() !== "")
    : [];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="sticky top-0 z-40 bg-gray-50/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-700 font-bold shadow-md hover:shadow-lg hover:text-orange-600 hover:scale-105 transition-all duration-300 border border-gray-100"
          >
            <FaArrowLeft /> Back to Recipes
          </button>
        </div>
      </div>

      <DataHandler
        loading={loading}
        error={error}
        data={recipeDetails ? [recipeDetails] : []}
      >
        {recipeDetails && (
          <div className="container mx-auto px-4 mt-6">
            <div className="relative h-[400px] md:h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl mb-12 group">
              <img
                src={recipeDetails.thumb}
                alt={recipeDetails.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-extrabold uppercase tracking-wide shadow-lg border border-orange-400">
                    {recipeDetails.category}
                  </span>
                  {recipeDetails.area && (
                    <span className="bg-white/20 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-bold border border-white/40">
                      {recipeDetails.area}
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg mb-2 tracking-tight">
                  {recipeDetails.name}
                </h1>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-orange-100 rounded-full text-orange-600">
                      <FaUtensils className="text-xl" />
                    </div>
                    Ingredients
                  </h2>
                  <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {recipeDetails.ingredients?.map((ing, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-4 text-gray-700 p-3 hover:bg-orange-50 rounded-xl transition-all duration-300 border border-transparent hover:border-orange-100 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-sm shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                          {idx + 1}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-extrabold text-gray-900 text-lg">
                            {ing.measure}
                          </span>
                          <span className="text-gray-500 font-medium group-hover:text-orange-600 transition-colors">
                            {ing.name}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => setOpen(true)}
                    className="w-full mt-8 bg-linear-to-r from-orange-500 to-red-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-orange-200 transition-all duration-300 flex items-center justify-center gap-3 transform active:scale-95 hover:-translate-y-1"
                  >
                    <FaCalendarPlus className="text-2xl" />
                    Add to Meal Plan
                  </button>
                </div>
              </div>

              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 md:p-10 rounded-3xl shadow-md border border-gray-100">
                  <h2 className="text-3xl font-bold text-gray-800 mb-8 border-l-8 border-orange-500 pl-6 py-2 bg-orange-50 rounded-r-xl">
                    Cooking Instructions
                  </h2>

                  <div>
                    {instructionsList.length > 0 ? (
                      instructionsList.map((line, idx) => {
                        const isHeader = /^(step\s*\d+|^\d+\.?)\s*$/i.test(
                          line.trim()
                        );

                        if (isHeader) {
                          return (
                            <h3
                              key={idx}
                              className="text-xl font-extrabold text-orange-600 mt-3 mb-3 uppercase tracking-wider border-b-2 border-orange-100 pb-1 inline-block transform transition-all duration-300 hover:translate-x-2 hover:text-orange-700 hover:border-orange-400 cursor-default"
                            >
                              {line}
                            </h3>
                          );
                        } else {
                          return (
                            <p
                              key={idx}
                              className="text-gray-600 text-lg leading-relaxed text-justify mb-2 p-3 rounded-xl transition-all duration-300 bg-orange-50 hover:bg-orange-100 hover:text-gray-900 hover:shadow-sm border border-transparent hover:border-orange-200"
                            >
                              {line}
                            </p>
                          );
                        }
                      })
                    ) : (
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line text-lg">
                        {recipeDetails.instruction}
                      </p>
                    )}
                  </div>
                </div>

                {recipeDetails.video && (
                  <div className="bg-white p-2 rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                    <a
                      href={recipeDetails.video}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative block group w-full h-64 md:h-80 rounded-2xl overflow-hidden"
                    >
                      <img
                        src={videoThumbnail}
                        alt="Video Thumbnail"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />

                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors flex flex-col items-center justify-center gap-4">
                        <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300 animate-pulse">
                          <FaPlay className="text-white text-3xl ml-2" />
                        </div>
                        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-wider uppercase">
                          Watch Tutorial
                        </div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {open && (
              <MealPlanModal recipeDetails={recipeDetails} setOpen={setOpen} />
            )}
          </div>
        )}
      </DataHandler>
    </div>
  );
};

export default RecipeDetails;
