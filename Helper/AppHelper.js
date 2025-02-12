import AsyncStorage from "@react-native-async-storage/async-storage";
// import Sound from 'react-native-sound';
import moment from 'moment';


//  FIREBASE CREDENTIALS
export const firebaseConfig = {
    apiKey: "AIzaSyDJcrUTf2nkIx33INiBtpvSDVDEkCm0mmE",
    authDomain: "cryptogram-letter-puzzle.firebaseapp.com",
    projectId: "cryptogram-letter-puzzle",
    storageBucket: "cryptogram-letter-puzzle.firebasestorage.app",
    messagingSenderId: "811440145032",
    appId: "1:811440145032:android:d1faf4daeb5b6a38e8553d",
    measurementId: ""
  };


// TEST AD ID
export const BANNER_AD = 'ca-app-pub-3940256099942544/9214589741';
export const COIN_REWARD = 'ca-app-pub-3940256099942544/5354046379';
export const HINT_REWARD = 'ca-app-pub-3940256099942544/5354046379';
export const RESUME_REWARD = 'ca-app-pub-3940256099942544/5224354917';
// LIVE AD ID'S
// export const BANNER_AD = 'ca-app-pub-3781511156022357/9088003632';
// export const COIN_REWARD = 'ca-app-pub-3781511156022357/5648587543';
// export const HINT_REWARD = 'ca-app-pub-3781511156022357/4746569410';
// export const RESUME_REWARD = 'ca-app-pub-3781511156022357/9998896090';

// Optional configuration
export const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: true,
};

export const set_async_data = async (name, value) => {
    try {
        await AsyncStorage.setItem(name, JSON.stringify(value));
        return true;
    } catch (error) {
        return false;
    }
};

export const get_async_data = async (name) => {
    try {
        const data = await AsyncStorage.getItem(name);
        return data != null ? JSON.parse(data) : null;
    } catch (error) {
        return false;
    }
};

export const generate_id = async () => {
    const id = await get_async_data('user_id');

    if (id == null || id == undefined) {
        await set_async_data('user_id', 1);
    }
    return true;
}

export const incrementValue = async () => {
    try {
        // Retrieve the current value from AsyncStorage
        const value = await AsyncStorage.getItem('key');

        // If value is found and it's a number, increment it
        let newValue = value ? parseInt(value, 10) + 1 : 1;

        // Save the new incremented value back to AsyncStorage
        await AsyncStorage.setItem('key', newValue.toString());

        // console.log('Updated value:', newValue); // Log the new value
    } catch (error) {
        console.error('Failed to retrieve or update value:', error);
    }
};

export const playSound = (music) => {
    // Load the sound
    // const sound = new Sound(music, Sound.MAIN_BUNDLE, (error) => {
    //     console.log('MAIN_BUNDLE ', Sound.MAIN_BUNDLE);
    //     if (error) {
    //         console.error('Failed to load the sound', error);
    //         return;
    //     }

    //     // Play the sound
    //     sound.play((success) => {
    //         if (success) {
    //             console.log('Sound played successfully');
    //         } else {
    //             console.log('Playback failed due to audio decoding errors');
    //         }

    //         // Release the sound when playback is finished
    //         sound.release();
    //     });
    // });
};

export const first_try_win = async () => {
    let data = await get_async_data('first_try_win');
    if (data != null) {
        data = data + 1;
        await set_async_data('first_try_win', data);
    } else {
        await set_async_data('first_try_win', 1);
    }
}

export const get_all_stats_data = async () => {
    let data = { first_try_win: 0, letter_solved: 0, word_solved: 0, level_completed: 0, level_durations: null, days_completed: [] };

    let first_try_win = await get_async_data('first_try_win');
    let letter_solved = await get_async_data('letter_solved');
    let word_solved = await get_async_data('word_solved');
    let level_durations = await get_async_data('level_duration');
    let days_completed = await get_async_data('days_completed');

    data.first_try_win = first_try_win;
    data.letter_solved = letter_solved;
    data.word_solved = word_solved;
    data.level_durations = level_durations;
    data.days_completed = days_completed;
    return data;

}

export const letter_solved = async () => {
    let data = await get_async_data('letter_solved');
    if (data != null) {
        data = data + 1;
        console.log('TOTAL LETTER SOLVED', data);
        await set_async_data('letter_solved', data);
    } else {
        await set_async_data('letter_solved', 1);
    }
}

export const time = async () => {
    const currentTime = moment();
    const timeAfterFourHours = currentTime.add(4, 'hours').format('YYYY-MM-DD HH:mm:ss');


    // try {
    //     // Get the current time
    //     const currentTime = new Date().toISOString();

    //     // Retrieve existing time array from Async Storage
    //     const storedTimesJson = await AsyncStorage.getItem(TIME_STORAGE_KEY);
    //     const storedTimes = storedTimesJson ? JSON.parse(storedTimesJson) : [];

    //     // Add the current time to the array
    //     storedTimes.push(currentTime);

    //     // Save the updated array back to Async Storage
    //     await AsyncStorage.setItem(TIME_STORAGE_KEY, JSON.stringify(storedTimes));

    //     console.log('Time stored successfully:', currentTime);
    // } catch (error) {
    //     console.error('Error storing time:', error);
    // }
}

export const word_solved = async (total) => {
    let data = await get_async_data('word_solved');
    if (data != null) {
        data = data + total;
        console.log('TOTAL WORD SOLVED', data);
        await set_async_data('word_solved', data);
    } else {
        await set_async_data('word_solved', 0);
    }
}

export const days_completed = async () => {
    try {
        // Get the stored dates from AsyncStorage (or whatever your data source is)
        const storedData = await get_async_data('days_completed');

        // If no data exists or the data is not valid JSON, default to an empty array
        let openedDates = [];
        if (storedData) {
            openedDates = storedData; // Use the retrieved data if it was valid
        }

        // Get today's date in 'YYYY-MM-DD' format
        const today = moment().format('YYYY-MM-DD');

        // Check if today's date is already stored, if not, add it
        if (!openedDates.includes(today)) {
            openedDates.push(today);
            // Save the updated list of opened dates back to AsyncStorage
            await set_async_data('days_completed', openedDates);
        }
    } catch (error) {
        console.error('Error getting Days Completed:', error);
    }
};

export const get_total_time = async () => {
    let current_time = moment().format('YYYY-MM-DD HH:mm:ss');
    let start_time = await get_async_data('start_time');

    console.log(`${current_time.diff(start_time, 'minutes')} - ${current_time.diff(start_time, 'seconds')}`);
}

export const remaining_lifes = async () => { // get remainig lifes
    let life = await get_async_data('remaining_lifes');
    let hints = await get_async_data('hints');
    let round = await get_async_data('round');

    if (life == null || life == undefined) {
        await set_async_data('remaining_lifes', 5);
    } else {
        return life;
    }

    if (hints == null || hints == undefined) {
        await set_async_data('hints', 1);
    } else {
        return life;
    }

    if (round == null || round == undefined) {
        await set_async_data('round', 'round_1');
    } else {
        return life;
    }
}

export const subtract_life = async () => {
    try {
        let current_live = await get_async_data('remaining_lifes');
        if (current_live >= 1) {
            await set_async_data('remaining_lifes', current_live - 1);
        } else {
            await set_async_data('remaining_lifes', 0);
        }
    } catch (error) {
        console.error('Error updating remaining lives:', error);
    }
}

export const add_life = async () => {
    try {
        let current_live = await get_async_data('remaining_lifes');
        await set_async_data('remaining_lifes', current_live + 1);
        console.log('Live Added');
    } catch (error) {
        console.error('Error updating remaining lives:', error);
    }
};

export const concatenateAlphabets = (data) => {
    return data.map(item => item.alphabet).join('');
}

// Helper function to convert HH:MM:SS to total seconds
const timeToSeconds = (time) => {
    let [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

export const get_best_time = (timeArray) => {
    if (!Array.isArray(timeArray) || timeArray.length === 0) return null;

    return timeArray.reduce((minTime, currentTime) => {
        return timeToSeconds(currentTime) < timeToSeconds(minTime) ? currentTime : minTime;
    });
};

// Helper function to convert total seconds back to HH:MM:SS
const secondsToTime = (totalSeconds) => {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    // Ensure leading zeros for consistent formatting
    return [hours, minutes, seconds].map(unit => String(unit).padStart(2, '0')).join(":");
};

// Function to calculate the average duration
export const get_average_time = async (timeArray) => {
    if (!Array.isArray(timeArray) || timeArray.length === 0) return null;

    // Convert all times to total seconds and compute the sum
    let totalSeconds = timeArray.reduce((sum, time) => sum + timeToSeconds(time), 0);

    // Calculate the average in seconds
    let avgSeconds = Math.floor(totalSeconds / timeArray.length);

    // Convert the result back to HH:MM:SS format
    return secondsToTime(avgSeconds);
};

// export const month_completed = async () => {

//     // Get the stored dates from localStorage
//     let openedDates = JSON.parse(AsyncStorage.getItem('days_completed')) || [];

//     // Get today's date as 'YYYY-MM-DD' format
//     const today = moment().format('YYYY-MM-DD');

//     // Check if today's date is already stored, if not, add it
//     if (!openedDates.includes(today)) {
//         openedDates.push(today);
//         AsyncStorage.setItem('days_completed', JSON.stringify(openedDates));
//     }
// }

export const getUnusedVisibleLetters = (data) => {
    let letters = [];
    data.filter(item => item.number == -3).map(item => letters.push(item.alphabet));
    return letters;
}

export const getRepeatedHiddenAlphabets = (data) => {
    // all those alphabets that are hidden inside phrase but 1 time it is shown
    // example :  LOVE Y_U (O occurs multiple times)
    // Create a map to track counts and `isHidden` occurrences

    const alphabetDetails = {};

    // Populate the map
    data.forEach(item => {
        const { alphabet, isHidden } = item;
        if (!alphabetDetails[alphabet]) {
            alphabetDetails[alphabet] = { hasHidden: false, hasVisible: false };
        }
        if (isHidden) {
            alphabetDetails[alphabet].hasHidden = true;
        } else {
            alphabetDetails[alphabet].hasVisible = true;
        }
    });

    // Filter for letters that have both `isHidden: true` and `isHidden: false`
    return Object.keys(alphabetDetails).filter(
        alphabet => alphabetDetails[alphabet].hasHidden && alphabetDetails[alphabet].hasVisible
    );
}


export const findHiddenRepeatedAlphabets = (data) => {
    const alphabetMap = {};

    // Iterate through each item in the data
    data.forEach(item => {
        const letter = item.alphabet;

        if (!alphabetMap[letter]) {
            alphabetMap[letter] = { count: 0, isHidden: true };
        }

        alphabetMap[letter].count += 1;
        alphabetMap[letter].isHidden = alphabetMap[letter].isHidden && item.isHidden;
    });

    // Filter and return alphabets used multiple times with isHidden=true throughout
    const result = Object.keys(alphabetMap).filter(
        letter => alphabetMap[letter].count > 1 && alphabetMap[letter].isHidden
    );

    return result;
}
