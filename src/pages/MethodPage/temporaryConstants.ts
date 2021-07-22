import {LocationUnit} from "../../components/navigation/Location";

export const generalInfoText = "Method for quantify the protein content in sample. This method has multiple applications in experimental sciences. Chemical basis of the Bradford method (1976) is based on the absorbance shift observed in an acidic solution of dye Coomassie® Brilliant Blue G-250. When added to a solution of protein, the dye binds to the protein resulting in a colour change from a reddish brown to blue. References: 1.Bradford MM A rapid and sensitive method for the quantitation of microgram quantities of protein utilizing the principle of protein-dye binding. // Analytical Biochemistry. 1976. № 72. С. 248-254. 2.Pedrol, Nuria & Tamayo, Pilar. (2001). Protein Content Quantification by Bradford Method. 10.1007/0-306-48057-3_19."
const handleClick = () => {
    console.log("clicked breadcrumb")
}
const firstLocation: LocationUnit = {
    text: "First",
    handleClick: handleClick,
}
const secondLocation: LocationUnit = {
    text: "Second",
    handleClick: handleClick,
}
const thirdLocation: LocationUnit = {
    text: "Third",
    handleClick: handleClick,
}
export const locationList = [firstLocation, secondLocation, thirdLocation]