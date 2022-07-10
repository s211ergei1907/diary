import {store} from "../store/store.js";
import {findNotesByWord} from "./searching.utils.js";

export const useInputSearchingNote = () => {
    let searchingTimeout = null;
    const onSearch = (value) => {
        clearTimeout(searchingTimeout);
        searchingTimeout = setTimeout(()=> {
            if(!value){
                store.setIsSearching(false);
            } else {
                store.setSearchedNotes(findNotesByWord(value));
                store.setIsSearching(true);
            }
        }, 200);
    }
    return {onSearch}
}
