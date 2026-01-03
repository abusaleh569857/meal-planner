// import Swal from "sweetalert2";
// import { useMealPlan } from "../hooks/useMealPlan";
// import { FaTimes, FaCalendarAlt, FaUtensils } from "react-icons/fa";

// const MealPlanModal = ({ recipeDetails, setOpen }) => {
//   const meal = recipeDetails;

//   const daysObj = [
//     { key: "mon", label: "Monday" },
//     { key: "tues", label: "Tuesday" },
//     { key: "wed", label: "Wednesday" },
//     { key: "thurs", label: "Thursday" },
//     { key: "fri", label: "Friday" },
//     { key: "sat", label: "Saturday" },
//     { key: "sun", label: "Sunday" },
//   ];

//   const { state, dispatch } = useMealPlan();

//   const handleMealPlan = async (meal, dayKey) => {
//     const alreadyAddedMeal = state.mealPlan[dayKey]?.some(
//       (sameMeal) => sameMeal.id === meal.id
//     );

//     if (alreadyAddedMeal) {
//       const result = await Swal.fire({
//         title: `<span class="text-gray-800">Already on Menu!</span>`,
//         html: `<p class="text-gray-600">You have already planned <b>${meal.name}</b> for this day. Do you want to add it again?</p>`,
//         icon: "question",
//         iconColor: "#f97316",
//         showCancelButton: true,
//         confirmButtonText: "Yes, Add Again",
//         confirmButtonColor: "#f97316",
//         cancelButtonText: "No, Cancel",
//         cancelButtonColor: "#d1d5db",
//         customClass: {
//           popup: "rounded-3xl",
//         },
//       });
//       if (!result.isConfirmed) return;
//     }

//     dispatch({
//       type: "ADD_MEAL",
//       payload: {
//         day: dayKey,
//         meal: meal,
//       },
//     });

//     Swal.fire({
//       icon: "success",
//       title: "Added to Meal Plan!",
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 2000,
//       iconColor: "#f97316",
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative transform transition-all scale-100 animate-fade-in-up max-h-[90vh] overflow-y-auto">
//         <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
//           <div className="flex items-center gap-3">
//             <div className="bg-orange-100 p-3 rounded-full">
//               <FaCalendarAlt className="text-orange-500 text-xl" />
//             </div>
//             <div>
//               <h2 className="text-2xl font-bold text-gray-800">
//                 Plan This Meal
//               </h2>
//               <p className="text-sm text-gray-500">
//                 Select a day to add to your weekly plan.
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={() => setOpen(false)}
//             className="p-3 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm border border-gray-100"
//           >
//             <FaTimes className="text-xl" />
//           </button>
//         </div>

//         <div className="p-6 bg-linear-to-r from-orange-50 to-white flex items-center gap-5 border-b border-gray-100">
//           <img
//             src={meal.thumb}
//             alt={meal.name}
//             className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white"
//           />
//           <div className="flex-1">
//             <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
//               {meal.category}
//             </span>
//             <h3 className="text-2xl font-extrabold text-gray-800 line-clamp-2">
//               {meal.name}
//             </h3>
//           </div>
//         </div>

//         <div className="p-6 md:p-8 bg-gray-50/30">
//           <h3 className="text-lg font-bold text-gray-700 mb-5 flex items-center gap-2">
//             <FaUtensils className="text-gray-400" /> Choose a Day:
//           </h3>

//           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
//             {daysObj.map((dayItem) => {
//               const mealCount = state.mealPlan[dayItem.key]?.length || 0;

//               return (
//                 <button
//                   key={dayItem.key}
//                   onClick={() => handleMealPlan(meal, dayItem.key)}
//                   className="group relative flex flex-col items-center justify-center p-5 min-h-[110px] rounded-2xl bg-white border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50/50 shadow-sm hover:shadow-md transition-all duration-300 text-left active:scale-95"
//                 >
//                   <div className="mt-2 text-center">
//                     <span className="block text-gray-700 font-bold group-hover:text-orange-600 text-xl mb-1">
//                       {dayItem.label.slice(0, 3)}
//                     </span>
//                     <span className="block text-xs text-gray-400 group-hover:text-orange-400 font-medium tracking-wide">
//                       {dayItem.label}
//                     </span>
//                   </div>

//                   {mealCount > 0 ? (
//                     <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-orange-200 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
//                       {mealCount} {mealCount === 1 ? "Item" : "Items"}
//                     </div>
//                   ) : (
//                     <div className="absolute top-2 right-2 text-gray-300 text-[10px] font-medium px-2 py-1 bg-gray-100 rounded-full">
//                       Empty
//                     </div>
//                   )}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MealPlanModal;

import Swal from "sweetalert2";
import { useMealPlan } from "../hooks/useMealPlan";
import {
  FaTimes,
  FaCalendarAlt,
  FaUtensils,
  FaArrowRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MealPlanModal = ({ recipeDetails, setOpen }) => {
  const meal = recipeDetails;
  const navigate = useNavigate();

  const daysObj = [
    { key: "mon", label: "Monday" },
    { key: "tues", label: "Tuesday" },
    { key: "wed", label: "Wednesday" },
    { key: "thurs", label: "Thursday" },
    { key: "fri", label: "Friday" },
    { key: "sat", label: "Saturday" },
    { key: "sun", label: "Sunday" },
  ];

  const { state, dispatch } = useMealPlan();

  const handleMealPlan = async (meal, dayKey) => {
    const alreadyAddedMeal = state.mealPlan[dayKey]?.some(
      (sameMeal) => sameMeal.id === meal.id
    );

    if (alreadyAddedMeal) {
      const result = await Swal.fire({
        title: `<span class="text-gray-800">Already on Menu!</span>`,
        html: `<p class="text-gray-600">You have already planned <b>${meal.name}</b> for this day. Do you want to add it again?</p>`,
        icon: "question",
        iconColor: "#f97316",
        showCancelButton: true,
        confirmButtonText: "Yes, Add Again",
        confirmButtonColor: "#f97316",
        cancelButtonText: "No, Cancel",
        cancelButtonColor: "#d1d5db",
        customClass: {
          popup: "rounded-3xl",
        },
      });
      if (!result.isConfirmed) return;
    }

    dispatch({
      type: "ADD_MEAL",
      payload: {
        day: dayKey,
        meal: meal,
      },
    });

    Swal.fire({
      icon: "success",
      title: "Added to Meal Plan!",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      iconColor: "#f97316",
    });
  };

  const goToMealPlanner = () => {
    setOpen(false);
    navigate("/meal-plan");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl relative transform transition-all scale-100 animate-fade-in-up max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <FaCalendarAlt className="text-orange-500 text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Plan This Meal
              </h2>
              <p className="text-sm text-gray-500">
                Select a day to add to your weekly plan.
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-3 bg-white rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all shadow-sm border border-gray-100"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        <div className="p-6 bg-linear-to-r from-orange-50 to-white flex items-center gap-5 border-b border-gray-100">
          <img
            src={meal.thumb}
            alt={meal.name}
            className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white"
          />
          <div className="flex-1">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
              {meal.category}
            </span>
            <h3 className="text-2xl font-extrabold text-gray-800 line-clamp-2">
              {meal.name}
            </h3>
          </div>
        </div>

        <div className="p-6 md:p-8 bg-gray-50/30">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-700 flex items-center gap-2">
              <FaUtensils className="text-gray-400" /> Choose a Day:
            </h3>

            <button
              onClick={goToMealPlanner}
              className="flex items-center gap-2 bg-linear-to-r from-orange-500 to-red-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group"
            >
              View Full Plan
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {daysObj.map((dayItem) => {
              const mealCount = state.mealPlan[dayItem.key]?.length || 0;

              return (
                <button
                  key={dayItem.key}
                  onClick={() => handleMealPlan(meal, dayItem.key)}
                  className="group relative flex flex-col items-center justify-center p-5 min-h-[110px] rounded-2xl bg-white border-2 border-gray-200 hover:border-orange-400 hover:bg-orange-50/50 shadow-sm hover:shadow-md transition-all duration-300 text-left active:scale-95"
                >
                  <div className="mt-2 text-center">
                    <span className="block text-gray-700 font-bold group-hover:text-orange-600 text-xl mb-1">
                      {dayItem.label.slice(0, 3)}
                    </span>
                    <span className="block text-xs text-gray-400 group-hover:text-orange-400 font-medium tracking-wide">
                      {dayItem.label}
                    </span>
                  </div>

                  {mealCount > 0 ? (
                    <div className="absolute top-2 right-2 bg-orange-100 text-orange-600 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-orange-200 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-sm">
                      {mealCount} {mealCount === 1 ? "Item" : "Items"}
                    </div>
                  ) : (
                    <div className="absolute top-2 right-2 text-gray-300 text-[10px] font-medium px-2 py-1 bg-gray-100 rounded-full">
                      Empty
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanModal;
