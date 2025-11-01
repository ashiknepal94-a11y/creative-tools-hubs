// Helper Functions

// Format Date
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

// Throttle Function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Check if Element is in Viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Generate Random ID
function generateId(length = 8) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

// Validate Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate URL
function validateURL(url) {
    try {
        new URL(url);
        return true;
    } catch (e) {
        return false;
    }
}

// Escape HTML
function escapeHTML(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Capitalize First Letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Truncate Text
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}

// Get Random Element from Array
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Shuffle Array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Convert RGB to Hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Convert Hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Get Contrast Color
function getContrastColor(hexColor) {
    const rgb = hexToRgb(hexColor);
    if (!rgb) return '#000000';
    
    // Calculate luminance
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    
    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? '#000000' : '#ffffff';
}

// Local Storage Helpers
function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to local storage:', e);
        return false;
    }
}

function getFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error getting from local storage:', e);
        return null;
    }
}

function removeFromLocalStorage(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (e) {
        console.error('Error removing from local storage:', e);
        return false;
    }
}

// Session Storage Helpers
function saveToSessionStorage(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving to session storage:', e);
        return false;
    }
}

function getFromSessionStorage(key) {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (e) {
        console.error('Error getting from session storage:', e);
        return null;
    }
}

// Get Query Parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Set Query Parameter
function setQueryParam(param, value) {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.replaceState({}, '', url);
}

// Remove Query Parameter
function removeQueryParam(param) {
    const url = new URL(window.location);
    url.searchParams.delete(param);
    window.history.replaceState({}, '', url);
}

// Get Cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// Set Cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
}

// Delete Cookie
function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

// Detect Device Type
function detectDeviceType() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return 'mobile';
    }
    return 'desktop';
}

// Detect Browser
function detectBrowser() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Firefox") > -1) {
        return "Mozilla Firefox";
    } else if (userAgent.indexOf("Chrome") > -1) {
        return "Google Chrome";
    } else if (userAgent.indexOf("Safari") > -1) {
        return "Apple Safari";
    } else if (userAgent.indexOf("Opera") > -1 || userAgent.indexOf("OPR") > -1) {
        return "Opera";
    } else if (userAgent.indexOf("MSIE") > -1 || userAgent.indexOf("Trident") > -1) {
        return "Internet Explorer";
    }
    
    return "Unknown";
}

// Get OS
function detectOS() {
    const userAgent = navigator.userAgent;
    
    if (userAgent.indexOf("Win") > -1) return "Windows";
    if (userAgent.indexOf("Mac") > -1) return "MacOS";
    if (userAgent.indexOf("Linux") > -1) return "Linux";
    if (userAgent.indexOf("Android") > -1) return "Android";
    if (userAgent.indexOf("iOS") > -1) return "iOS";
    
    return "Unknown";
}

// Check if Online
function isOnline() {
    return navigator.onLine;
}

// Download File
function downloadFile(data, filename, type) {
    const blob = new Blob([data], { type });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.style.display = 'none';
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    URL.revokeObjectURL(url);
}

// Print Page
function printPage() {
    window.print();
}

// Reload Page
function reloadPage() {
    window.location.reload();
}

// Redirect to URL
function redirectTo(url) {
    window.location.href = url;
}

// Open URL in New Tab
function openInNewTab(url) {
    window.open(url, '_blank');
}

// Scroll to Top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to Element
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Get Scroll Position
function getScrollPosition() {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
    };
}

// Set Scroll Position
function setScrollPosition(x, y) {
    window.scrollTo(x, y);
}

// Get Element Position
function getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
        x: rect.left + window.pageXOffset,
        y: rect.top + window.pageYOffset,
        width: rect.width,
        height: rect.height
    };
}

// Add Event Listener with Delegation
function addDelegatedEventListener(parent, selector, event, handler) {
    parent.addEventListener(event, function(e) {
        if (e.target.matches(selector)) {
            handler(e);
        }
    });
}

// Remove Event Listener
function removeEventListener(element, event, handler) {
    element.removeEventListener(event, handler);
}

// Create Element with Attributes
function createElement(tag, attributes = {}, children = []) {
    const element = document.createElement(tag);
    
    // Set attributes
    Object.keys(attributes).forEach(key => {
        if (key === 'className') {
            element.className = attributes[key];
        } else if (key === 'innerHTML') {
            element.innerHTML = attributes[key];
        } else if (key === 'textContent') {
            element.textContent = attributes[key];
        } else {
            element.setAttribute(key, attributes[key]);
        }
    });
    
    // Add children
    children.forEach(child => {
        if (typeof child === 'string') {
            element.appendChild(document.createTextNode(child));
        } else {
            element.appendChild(child);
        }
    });
    
    return element;
}

// Wait for DOM to be Ready
function DOMReady(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

// Wait for Element to Exist
function waitForElement(selector, callback, timeout = 10000) {
    const startTime = Date.now();
    
    function checkElement() {
        const element = document.querySelector(selector);
        
        if (element) {
            callback(element);
        } else if (Date.now() - startTime < timeout) {
            setTimeout(checkElement, 100);
        } else {
            console.error(`Element ${selector} not found within ${timeout}ms`);
        }
    }
    
    checkElement();
}

// Show Notification
function showNotification(message, type = 'info', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

// Copy to Clipboard
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
    showNotification('Copied to clipboard!', 'success');
}

// Get File Extension
function getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

// Get File Name without Extension
function getFileNameWithoutExtension(filename) {
    return filename.replace(/\.[^/.]+$/, "");
}

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Generate Random Color
function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
}

// Generate Random Number
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate Random String
function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}

// Calculate Percentage
function calculatePercentage(value, total) {
    return Math.round((value / total) * 100);
}

// Calculate Discount
function calculateDiscount(originalPrice, discountPercentage) {
    return originalPrice - (originalPrice * (discountPercentage / 100));
}

// Calculate Tax
function calculateTax(amount, taxPercentage) {
    return amount * (taxPercentage / 100);
}

// Calculate Total with Tax
function calculateTotalWithTax(amount, taxPercentage) {
    return amount + calculateTax(amount, taxPercentage);
}

// Format Currency
function formatCurrency(amount, currency = 'USD', locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Format Number
function formatNumber(number, decimals = 0, locale = 'en-US') {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    }).format(number);
}

// Parse Number from String
function parseNumber(string, locale = 'en-US') {
    const thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
    const decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');
    
    return parseFloat(string
        .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
    );
}

// Calculate Age
function calculateAge(birthDate) {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDifference = today.getMonth() - birthDateObj.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    
    return age;
}

// Calculate Days Between Dates
function calculateDaysBetweenDates(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    
    return Math.round(Math.abs((firstDate - secondDate) / oneDay));
}

// Add Days to Date
function addDaysToDate(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

// Subtract Days from Date
function subtractDaysFromDate(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
}

// Get Start of Day
function getStartOfDay(date) {
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
}

// Get End of Day
function getEndOfDay(date) {
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
}

// Get Start of Week
function getStartOfWeek(date, startOfWeek = 0) {
    const result = new Date(date);
    const day = result.getDay();
    const diff = result.getDate() - day + (day === 0 ? -6 : startOfWeek);
    
    return new Date(result.setDate(diff));
}

// Get End of Week
function getEndOfWeek(date, startOfWeek = 0) {
    const result = getStartOfWeek(date, startOfWeek);
    result.setDate(result.getDate() + 6);
    return result;
}

// Get Start of Month
function getStartOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

// Get End of Month
function getEndOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

// Get Start of Year
function getStartOfYear(date) {
    return new Date(date.getFullYear(), 0, 1);
}

// Get End of Year
function getEndOfYear(date) {
    return new Date(date.getFullYear(), 11, 31);
}

// Is Leap Year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Get Days in Month
function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}

// Get Day of Year
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    
    return Math.floor(diff / oneDay);
}

// Get Week of Year
function getWeekOfYear(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

// Get Quarter of Year
function getQuarterOfYear(date) {
    const month = date.getMonth();
    return Math.floor(month / 3) + 1;
}

// Is Same Day
function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
}

// Is Same Week
function isSameWeek(date1, date2, startOfWeek = 0) {
    const start1 = getStartOfWeek(date1, startOfWeek);
    const start2 = getStartOfWeek(date2, startOfWeek);
    
    return isSameDay(start1, start2);
}

// Is Same Month
function isSameMonth(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth();
}

// Is Same Year
function isSameYear(date1, date2) {
    return date1.getFullYear() === date2.getFullYear();
}

// Get Relative Time
function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''} ago`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''} ago`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'Just now';
}

// Get Time Ago
function getTimeAgo(date) {
    return getRelativeTime(date);
}

// Get Time Until
function getTimeUntil(date) {
    const now = new Date();
    const diff = date - now;
    
    if (diff < 0) return 'Already passed';
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);
    
    if (years > 0) return `${years} year${years > 1 ? 's' : ''}`;
    if (months > 0) return `${months} month${months > 1 ? 's' : ''}`;
    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''}`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''}`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''}`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    return 'Less than a minute';
}

// Is Today
function isToday(date) {
    const today = new Date();
    return isSameDay(date, today);
}

// Is Yesterday
function isYesterday(date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return isSameDay(date, yesterday);
}

// Is Tomorrow
function isTomorrow(date) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return isSameDay(date, tomorrow);
}

// Is This Week
function isThisWeek(date, startOfWeek = 0) {
    const today = new Date();
    return isSameWeek(date, today, startOfWeek);
}

// Is This Month
function isThisMonth(date) {
    const today = new Date();
    return isSameMonth(date, today);
}

// Is This Year
function isThisYear(date) {
    const today = new Date();
    return isSameYear(date, today);
}

// Is Future
function isFuture(date) {
    return date > new Date();
}

// Is Past
function isPast(date) {
    return date < new Date();
}

// Is Weekend
function isWeekend(date) {
    const day = date.getDay();
    return day === 0 || day === 6;
}

// Is Weekday
function isWeekday(date) {
    return !isWeekend(date);
}

// Get Next Weekend
function getNextWeekendDate(date = new Date()) {
    const result = new Date(date);
    const day = result.getDay();
    const daysUntilSaturday = (6 - day + 7) % 7 || 7;
    
    result.setDate(result.getDate() + daysUntilSaturday);
    return result;
}

// Get Previous Weekend
function getPreviousWeekendDate(date = new Date()) {
    const result = new Date(date);
    const day = result.getDay();
    const daysSinceSaturday = (day - 6 + 7) % 7 || 7;
    
    result.setDate(result.getDate() - daysSinceSaturday);
    return result;
}

// Get Next Weekday
function getNextWeekday(date = new Date()) {
    const result = new Date(date);
    result.setDate(result.getDate() + 1);
    
    while (isWeekend(result)) {
        result.setDate(result.getDate() + 1);
    }
    
    return result;
}

// Get Previous Weekday
function getPreviousWeekday(date = new Date()) {
    const result = new Date(date);
    result.setDate(result.getDate() - 1);
    
    while (isWeekend(result)) {
        result.setDate(result.getDate() - 1);
    }
    
    return result;
}

// Get Holidays (simplified)
function getHolidays(year = new Date().getFullYear()) {
    // This is a simplified version, in a real app you would use a library or API
    return [
        { name: 'New Year\'s Day', date: new Date(year, 0, 1) },
        { name: 'Valentine\'s Day', date: new Date(year, 1, 14) },
        { name: 'April Fools\' Day', date: new Date(year, 3, 1) },
        { name: 'Christmas', date: new Date(year, 11, 25) },
        { name: 'New Year\'s Eve', date: new Date(year, 11, 31) }
    ];
}

// Is Holiday
function isHoliday(date) {
    const holidays = getHolidays(date.getFullYear());
    return holidays.some(holiday => isSameDay(holiday.date, date));
}

// Get Next Holiday
function getNextHoliday(date = new Date()) {
    const holidays = getHolidays(date.getFullYear());
    const nextYearHolidays = getHolidays(date.getFullYear() + 1);
    const allHolidays = [...holidays, ...nextYearHolidays];
    
    const futureHolidays = allHolidays.filter(holiday => holiday.date >= date);
    
    if (futureHolidays.length > 0) {
        return futureHolidays[0];
    }
    
    return null;
}

// Get Business Days Between Dates
function getBusinessDaysBetweenDates(startDate, endDate) {
    let businessDays = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        if (isWeekday(currentDate)) {
            businessDays++;
        }
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return businessDays;
}

// Add Business Days to Date
function addBusinessDaysToDate(date, days) {
    const result = new Date(date);
    let businessDaysAdded = 0;
    
    while (businessDaysAdded < days) {
        result.setDate(result.getDate() + 1);
        
        if (isWeekday(result)) {
            businessDaysAdded++;
        }
    }
    
    return result;
}

// Subtract Business Days from Date
function subtractBusinessDaysFromDate(date, days) {
    const result = new Date(date);
    let businessDaysSubtracted = 0;
    
    while (businessDaysSubtracted < days) {
        result.setDate(result.getDate() - 1);
        
        if (isWeekday(result)) {
            businessDaysSubtracted++;
        }
    }
    
    return result;
}

// Get Work Hours Between Dates
function getWorkHoursBetweenDates(startDate, endDate, startHour = 9, endHour = 17) {
    let workHours = 0;
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
        if (isWeekday(currentDate)) {
            const dayStart = new Date(currentDate);
            dayStart.setHours(startHour, 0, 0, 0);
            
            const dayEnd = new Date(currentDate);
            dayEnd.setHours(endHour, 0, 0, 0);
            
            const periodStart = new Date(Math.max(currentDate, dayStart));
            const periodEnd = new Date(Math.min(endDate, dayEnd));
            
            if (periodEnd > periodStart) {
                workHours += (periodEnd - periodStart) / (1000 * 60 * 60);
            }
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return workHours;
}

// Get Working Days in Month
function getWorkingDaysInMonth(year, month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 0);
    
    return getBusinessDaysBetweenDates(startDate, endDate);
}

// Is Date Range Overlapping
function isDateRangeOverlapping(start1, end1, start2, end2) {
    return start1 <= end2 && start2 <= end1;
}

// Merge Date Ranges
function mergeDateRanges(ranges) {
    if (ranges.length <= 1) return ranges;
    
    // Sort ranges by start date
    const sortedRanges = [...ranges].sort((a, b) => a.start - b.start);
    
    const mergedRanges = [sortedRanges[0]];
    
    for (let i = 1; i < sortedRanges.length; i++) {
        const currentRange = sortedRanges[i];
        const lastMergedRange = mergedRanges[mergedRanges.length - 1];
        
        if (isDateRangeOverlapping(lastMergedRange.start, lastMergedRange.end, currentRange.start, currentRange.end)) {
            // Merge overlapping ranges
            lastMergedRange.end = new Date(Math.max(lastMergedRange.end, currentRange.end));
        } else {
            // Add non-overlapping range
            mergedRanges.push(currentRange);
        }
    }
    
    return mergedRanges;
}

// Get Intersection of Date Ranges
function getDateRangeIntersection(start1, end1, start2, end2) {
    const intersectionStart = new Date(Math.max(start1, start2));
    const intersectionEnd = new Date(Math.min(end1, end2));
    
    if (intersectionStart <= intersectionEnd) {
        return { start: intersectionStart, end: intersectionEnd };
    }
    
    return null;
}

// Get Union of Date Ranges
function getDateRangeUnion(start1, end1, start2, end2) {
    const unionStart = new Date(Math.min(start1, start2));
    const unionEnd = new Date(Math.max(end1, end2));
    
    return { start: unionStart, end: unionEnd };
}

// Get Difference of Date Ranges
function getDateRangeDifference(start1, end1, start2, end2) {
    const result = [];
    
    // Check if there's an intersection
    if (!isDateRangeOverlapping(start1, end1, start2, end2)) {
        // No intersection, return the original range
        result.push({ start: start1, end: end1 });
    } else {
        // There's an intersection, calculate the difference
        if (start1 < start2) {
            result.push({ start: start1, end: new Date(start2.getTime() - 1) });
        }
        
        if (end1 > end2) {
            result.push({ start: new Date(end2.getTime() + 1), end: end1 });
        }
    }
    
    return result;
}

// Is Date in Range
function isDateInRange(date, start, end) {
    return date >= start && date <= end;
}

// Get Duration Between Dates
function getDurationBetweenDates(startDate, endDate) {
    const diff = endDate - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
}

// Format Duration
function formatDuration(duration) {
    const { days, hours, minutes, seconds } = duration;
    
    let result = '';
    
    if (days > 0) {
        result += `${days} day${days > 1 ? 's' : ''} `;
    }
    
    if (hours > 0) {
        result += `${hours} hour${hours > 1 ? 's' : ''} `;
    }
    
    if (minutes > 0) {
        result += `${minutes} minute${minutes > 1 ? 's' : ''} `;
    }
    
    if (seconds > 0 || result === '') {
        result += `${seconds} second${seconds > 1 ? 's' : ''}`;
    }
    
    return result.trim();
}

// Parse Duration
function parseDuration(durationString) {
    const regex = /(\d+)\s*(day|days|hour|hours|minute|minutes|second|seconds)/g;
    let match;
    let totalSeconds = 0;
    
    while ((match = regex.exec(durationString)) !== null) {
        const value = parseInt(match[1]);
        const unit = match[2];
        
        switch (unit) {
            case 'day':
            case 'days':
                totalSeconds += value * 24 * 60 * 60;
                break;
            case 'hour':
            case 'hours':
                totalSeconds += value * 60 * 60;
                break;
            case 'minute':
            case 'minutes':
                totalSeconds += value * 60;
                break;
            case 'second':
            case 'seconds':
                totalSeconds += value;
                break;
        }
    }
    
    return totalSeconds * 1000; // Return milliseconds
}

// Add Duration to Date
function addDurationToDate(date, duration) {
    const result = new Date(date);
    result.setTime(result.getTime() + duration);
    return result;
}

// Subtract Duration from Date
function subtractDurationFromDate(date, duration) {
    const result = new Date(date);
    result.setTime(result.getTime() - duration);
    return result;
}

// Get Time Zones
function getTimeZones() {
    return Intl.supportedValuesOf('timeZone');
}

// Convert Date to Time Zone
function convertDateToTimeZone(date, timeZone) {
    return new Date(date.toLocaleString('en-US', { timeZone }));
}

// Format Date in Time Zone
function formatDateInTimeZone(date, timeZone, options = {}) {
    return date.toLocaleString('en-US', { timeZone, ...options });
}

// Get Time Zone Offset
function getTimeZoneOffset(timeZone) {
    const now = new Date();
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone }));
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    
    return (tzDate - utcDate) / (1000 * 60 * 60); // Return offset in hours
}

// Is Daylight Saving Time
function isDaylightSavingTime(date) {
    const january = new Date(date.getFullYear(), 0, 1);
    const july = new Date(date.getFullYear(), 6, 1);
    
    const standardOffset = Math.max(january.getTimezoneOffset(), july.getTimezoneOffset());
    
    return date.getTimezoneOffset() < standardOffset;
}

// Get Daylight Saving Time Start
function getDaylightSavingTimeStart(year) {
    // This is a simplified version, in a real app you would use a library
    // In the US, DST starts on the second Sunday of March
    const march = new Date(year, 2, 1);
    const dayOfWeek = march.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const secondSunday = 8 + daysUntilSunday;
    
    return new Date(year, 2, secondSunday, 2, 0, 0);
}

// Get Daylight Saving Time End
function getDaylightSavingTimeEnd(year) {
    // This is a simplified version, in a real app you would use a library
    // In the US, DST ends on the first Sunday of November
    const november = new Date(year, 10, 1);
    const dayOfWeek = november.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const firstSunday = 1 + daysUntilSunday;
    
    return new Date(year, 10, firstSunday, 2, 0, 0);
}

// Get Time Zone Abbreviation
function getTimeZoneAbbreviation(date = new Date()) {
    return date.toLocaleTimeString('en-us', { timeZoneName: 'short' }).split(' ')[2];
}

// Get Local Time Zone
function getLocalTimeZone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

// Get UTC Offset
function getUTCOffset(date = new Date()) {
    return date.getTimezoneOffset();
}

// Convert UTC Offset to String
function convertUTCOffsetToString(offset) {
    const hours = Math.floor(Math.abs(offset) / 60);
    const minutes = Math.abs(offset) % 60;
    const sign = offset <= 0 ? '+' : '-';
    
    return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Get Date Range in Time Zone
function getDateRangeInTimeZone(startDate, endDate, timeZone) {
    const start = convertDateToTimeZone(startDate, timeZone);
    const end = convertDateToTimeZone(endDate, timeZone);
    
    return { start, end };
}

// Get Date Range in UTC
function getDateRangeInUTC(startDate, endDate) {
    const start = new Date(startDate.toISOString());
    const end = new Date(endDate.toISOString());
    
    return { start, end };
}

// Get Date Range in Local Time
function getDateRangeInLocalTime(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return { start, end };
}

// Get Date Range in Time Zone with Offset
function getDateRangeInTimeZoneWithOffset(startDate, endDate, timeZone) {
    const start = convertDateToTimeZone(startDate, timeZone);
    const end = convertDateToTimeZone(endDate, timeZone);
    
    const startOffset = getTimeZoneOffset(timeZone);
    const endOffset = getTimeZoneOffset(timeZone);
    
    return {
        start,
        end,
        startOffset,
        endOffset
    };
}

// Get Date Range in UTC with Offset
function getDateRangeInUTCWithOffset(startDate, endDate) {
    const start = new Date(startDate.toISOString());
    const end = new Date(endDate.toISOString());
    
    return {
        start,
        end,
        startOffset: 0,
        endOffset: 0
    };
}

// Get Date Range in Local Time with Offset
function getDateRangeInLocalTimeWithOffset(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const offset = getUTCOffset();
    
    return {
        start,
        end,
        startOffset: offset,
        endOffset: offset
    };
}

// Get Date Range in Multiple Time Zones
function getDateRangeInMultipleTimeZones(startDate, endDate, timeZones) {
    const result = {};
    
    timeZones.forEach(timeZone => {
        result[timeZone] = getDateRangeInTimeZone(startDate, endDate, timeZone);
    });
    
    return result;
}

// Get Date Range in All Time Zones
function getDateRangeInAllTimeZones(startDate, endDate) {
    const timeZones = getTimeZones();
    return getDateRangeInMultipleTimeZones(startDate, endDate, timeZones);
}

// Get Date Range in Time Zone with Format
function getDateRangeInTimeZoneWithFormat(startDate, endDate, timeZone, format = 'YYYY-MM-DD HH:mm:ss') {
    const { start, end } = getDateRangeInTimeZone(startDate, endDate, timeZone);
    
    return {
        start: formatDate(start, format),
        end: formatDate(end, format)
    };
}

// Format Date
function formatDate(date, format = 'YYYY-MM-DD') {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

// Parse Date
function parseDate(dateString, format = 'YYYY-MM-DD') {
    if (format === 'YYYY-MM-DD') {
        const parts = dateString.split('-');
        return new Date(parts[0], parts[1] - 1, parts[2]);
    } else if (format === 'YYYY-MM-DD HH:mm:ss') {
        const parts = dateString.split(' ');
        const dateParts = parts[0].split('-');
        const timeParts = parts[1].split(':');
        
        return new Date(
            dateParts[0],
            dateParts[1] - 1,
            dateParts[2],
            timeParts[0],
            timeParts[1],
            timeParts[2]
        );
    }
    
    // Default to browser's date parsing
    return new Date(dateString);
}

// Get Date Parts
function getDateParts(date) {
    return {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
        milliseconds: date.getMilliseconds(),
        dayOfWeek: date.getDay(),
        dayOfYear: getDayOfYear(date),
        weekOfYear: getWeekOfYear(date),
        quarterOfYear: getQuarterOfYear(date)
    };
}

// Set Date Parts
function setDateParts(date, parts) {
    const result = new Date(date);
    
    if (parts.year !== undefined) result.setFullYear(parts.year);
    if (parts.month !== undefined) result.setMonth(parts.month - 1);
    if (parts.day !== undefined) result.setDate(parts.day);
    if (parts.hours !== undefined) result.setHours(parts.hours);
    if (parts.minutes !== undefined) result.setMinutes(parts.minutes);
    if (parts.seconds !== undefined) result.setSeconds(parts.seconds);
    if (parts.milliseconds !== undefined) result.setMilliseconds(parts.milliseconds);
    
    return result;
}

// Clone Date
function cloneDate(date) {
    return new Date(date);
}

// Compare Dates
function compareDates(date1, date2) {
    const time1 = date1.getTime();
    const time2 = date2.getTime();
    
    if (time1 < time2) return -1;
    if (time1 > time2) return 1;
    return 0;
}

// Sort Dates
function sortDates(dates, ascending = true) {
    return [...dates].sort((a, b) => {
        const result = compareDates(a, b);
        return ascending ? result : -result;
    });
}

// Get Unique Dates
function getUniqueDates(dates) {
    const uniqueDates = [];
    
    dates.forEach(date => {
        if (!uniqueDates.some(uniqueDate => isSameDay(date, uniqueDate))) {
            uniqueDates.push(date);
        }
    });
    
    return uniqueDates;
}

// Group Dates by Day
function groupDatesByDay(dates) {
    const groups = {};
    
    dates.forEach(date => {
        const key = formatDate(date, 'YYYY-MM-DD');
        
        if (!groups[key]) {
            groups[key] = [];
        }
        
        groups[key].push(date);
    });
    
    return groups;
}

// Group Dates by Week
function groupDatesByWeek(dates, startOfWeek = 0) {
    const groups = {};
    
    dates.forEach(date => {
        const weekStart = getStartOfWeek(date, startOfWeek);
        const key = formatDate(weekStart, 'YYYY-MM-DD');
        
        if (!groups[key]) {
            groups[key] = [];
        }
        
        groups[key].push(date);
    });
    
    return groups;
}

// Group Dates by Month
function groupDatesByMonth(dates) {
    const groups = {};
    
    dates.forEach(date => {
        const key = formatDate(date, 'YYYY-MM');
        
        if (!groups[key]) {
            groups[key] = [];
        }
        
        groups[key].push(date);
    });
    
    return groups;
}

// Group Dates by Year
function groupDatesByYear(dates) {
    const groups = {};
    
    dates.forEach(date => {
        const key = formatDate(date, 'YYYY');
        
        if (!groups[key]) {
            groups[key] = [];
        }
        
        groups[key].push(date);
    });
    
    return groups;
}

// Filter Dates by Range
function filterDatesByRange(dates, startDate, endDate) {
    return dates.filter(date => isDateInRange(date, startDate, endDate));
}

// Filter Dates by Day of Week
function filterDatesByDayOfWeek(dates, dayOfWeek) {
    return dates.filter(date => date.getDay() === dayOfWeek);
}

// Filter Dates by Month
function filterDatesByMonth(dates, month) {
    return dates.filter(date => date.getMonth() === month);
}

// Filter Dates by Year
function filterDatesByYear(dates, year) {
    return dates.filter(date => date.getFullYear() === year);
}

// Filter Dates by Weekday
function filterDatesByWeekday(dates) {
    return dates.filter(date => isWeekday(date));
}

// Filter Dates by Weekend
function filterDatesByWeekend(dates) {
    return dates.filter(date => isWeekend(date));
}

// Filter Dates by Today
function filterDatesByToday(dates) {
    const today = new Date();
    return dates.filter(date => isSameDay(date, today));
}

// Filter Dates by Future
function filterDatesByFuture(dates) {
    const now = new Date();
    return dates.filter(date => isFuture(date));
}

// Filter Dates by Past
function filterDatesByPast(dates) {
    const now = new Date();
    return dates.filter(date => isPast(date));
}

// Get Date Range
function getDateRange(dates) {
    if (dates.length === 0) return null;
    
    const sortedDates = sortDates(dates);
    
    return {
        start: sortedDates[0],
        end: sortedDates[sortedDates.length - 1]
    };
}

// Get Date Range Duration
function getDateRangeDuration(dates) {
    const range = getDateRange(dates);
    
    if (!range) return null;
    
    return getDurationBetweenDates(range.start, range.end);
}

// Get Date Range Business Days
function getDateRangeBusinessDays(dates) {
    return dates.filter(date => isWeekday(date)).length;
}

// Get Date Range Weekends
function getDateRangeWeekends(dates) {
    return dates.filter(date => isWeekend(date)).length;
}

// Get Date Range Holidays
function getDateRangeHolidays(dates) {
    return dates.filter(date => isHoliday(date)).length;
}

// Get Date Range Statistics
function getDateRangeStatistics(dates) {
    if (dates.length === 0) return null;
    
    const range = getDateRange(dates);
    const duration = getDateRangeDuration(dates);
    const businessDays = getDateRangeBusinessDays(dates);
    const weekends = getDateRangeWeekends(dates);
    const holidays = getDateRangeHolidays(dates);
    
    return {
        count: dates.length,
        range,
        duration,
        businessDays,
        weekends,
        holidays
    };
}

// Export all functions
window.Helpers = {
    formatDate,
    debounce,
    throttle,
    isInViewport,
    generateId,
    validateEmail,
    validateURL,
    escapeHTML,
    capitalizeFirstLetter,
    truncateText,
    getRandomElement,
    shuffleArray,
    rgbToHex,
    hexToRgb,
    getContrastColor,
    saveToLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage,
    saveToSessionStorage,
    getFromSessionStorage,
    getQueryParam,
    setQueryParam,
    removeQueryParam,
    getCookie,
    setCookie,
    deleteCookie,
    detectDeviceType,
    detectBrowser,
    detectOS,
    isOnline,
    downloadFile,
    printPage,
    reloadPage,
    redirectTo,
    openInNewTab,
    scrollToTop,
    scrollToElement,
    getScrollPosition,
    setScrollPosition,
    getElementPosition,
    addDelegatedEventListener,
    removeEventListener,
    createElement,
    DOMReady,
    waitForElement,
    showNotification,
    copyToClipboard,
    getFileExtension,
    getFileNameWithoutExtension,
    formatFileSize,
    generateRandomColor,
    generateRandomNumber,
    generateRandomString,
    calculatePercentage,
    calculateDiscount,
    calculateTax,
    calculateTotalWithTax,
    formatCurrency,
    formatNumber,
    parseNumber,
    calculateAge,
    calculateDaysBetweenDates,
    addDaysToDate,
    subtractDaysFromDate,
    getStartOfDay,
    getEndOfDay,
    getStartOfWeek,
    getEndOfWeek,
    getStartOfMonth,
    getEndOfMonth,
    getStartOfYear,
    getEndOfYear,
    isLeapYear,
    getDaysInMonth,
    getDayOfYear,
    getWeekOfYear,
    getQuarterOfYear,
    isSameDay,
    isSameWeek,
    isSameMonth,
    isSameYear,
    getRelativeTime,
    getTimeAgo,
    getTimeUntil,
    isToday,
    isYesterday,
    isTomorrow,
    isThisWeek,
    isThisMonth,
    isThisYear,
    isFuture,
    isPast,
    isWeekend,
    isWeekday,
    getNextWeekendDate,
    getPreviousWeekendDate,
    getNextWeekday,
    getPreviousWeekday,
    getHolidays,
    isHoliday,
    getNextHoliday,
    getBusinessDaysBetweenDates,
    addBusinessDaysToDate,
    subtractBusinessDaysFromDate,
    getWorkHoursBetweenDates,
    getWorkingDaysInMonth,
    isDateRangeOverlapping,
    mergeDateRanges,
    getDateRangeIntersection,
    getDateRangeUnion,
    getDateRangeDifference,
    isDateInRange,
    getDurationBetweenDates,
    formatDuration,
    parseDuration,
    addDurationToDate,
    subtractDurationFromDate,
    getTimeZones,
    convertDateToTimeZone,
    formatDateInTimeZone,
    getTimeZoneOffset,
    isDaylightSavingTime,
    getDaylightSavingTimeStart,
    getDaylightSavingTimeEnd,
    getTimeZoneAbbreviation,
    getLocalTimeZone,
    getUTCOffset,
    convertUTCOffsetToString,
    getDateRangeInTimeZone,
    getDateRangeInUTC,
    getDateRangeInLocalTime,
    getDateRangeInTimeZoneWithOffset,
    getDateRangeInUTCWithOffset,
    getDateRangeInLocalTimeWithOffset,
    getDateRangeInMultipleTimeZones,
    getDateRangeInAllTimeZones,
    getDateRangeInTimeZoneWithFormat,
    formatDate,
    parseDate,
    getDateParts,
    setDateParts,
    cloneDate,
    compareDates,
    sortDates,
    getUniqueDates,
    groupDatesByDay,
    groupDatesByWeek,
    groupDatesByMonth,
    groupDatesByYear,
    filterDatesByRange,
    filterDatesByDayOfWeek,
    filterDatesByMonth,
    filterDatesByYear,
    filterDatesByWeekday,
    filterDatesByWeekend,
    filterDatesByToday,
    filterDatesByFuture,
    filterDatesByPast,
    getDateRange,
    getDateRangeDuration,
    getDateRangeBusinessDays,
    getDateRangeWeekends,
    getDateRangeHolidays,
    getDateRangeStatistics
};