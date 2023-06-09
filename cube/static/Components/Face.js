/*
* Definition - Represents a single exposed face of a piece object
* Field(s): 
*  color: String - The color of the given face, either of the following -> ('w','r','o','g','b','y')
*  orientation: Array - The face's current direction/orientation. Ex: [0,1,0] is a face whihc points in the
*  positive Y direction, mapping to the white face.
*  solvedOrientation: Array - The face's solved orientation 
*/
class Face {
    constructor(orientation) {
        this.solvedOrientation = orientation;
        this.orientation = this.solvedOrientation;
        this.color = Face.OrientationToColor[orientation];
    }

    /*
    * Definition - Static field representing a HashMap that maps each color to the proper orientation 
    */
    static get ColorToOrientation() {
        return {
            'w': [0, 1, 0],
            'y': [0, -1, 0],
            'g': [0, 0, 1],
            'b': [0, 0, -1],
            'r': [1, 0, 0],
            'o': [-1, 0, 0],
        }
    }

    /*
    * Definition - Static field representing a HashMap that maps each color to the proper HEX Color
    */
    static get ColorToHex() {
        return {
            'w': 0xffffff,
            'y': 0xc4d500,
            'g': 0x029902,
            'b': 0x063dc9,
            'r': 0xcf0e0e,
            'o': 0xcd7103,
        }
    }

    /*
    * Definition - Static field representing a HashMap that maps each orientation to the proper color
    */
    static get OrientationToColor() {
        let map = new Map();
        map[[0, 1, 0]] = 'w';
        map[[0, -1, 0]] = 'y';
        map[[0, 0, 1]] = 'g';
        map[[0, 0, -1]] = 'b';
        map[[1, 0, 0]] = 'r';
        map[[-1, 0, 0]] = 'o';
        return map;
    }

    static get OppositeColorOf() {
        return {
            'w': 'y',
            'y': 'w',
            'g': 'b',
            'b': 'g',
            'r': 'o',
            'o': 'r',
        }
    }

    /*
    * Definition - Returns true if the face is in the correct orientation, and false otherwise
    * Input - None
    * Output - Boolean
    */
    IsCorrectOrientation() {
        for (let i = 0; i < this.orientation.length; i++) {
            if (this.orientation[i] !== this.solvedOrientation[i]) return false
        }
        return true
    }

    /*
    * Definition - Returns true if the coordinates passed are found on the same faces
    * Input - coordinate1: Array, coordinate2: Array
    * Output - Boolean
    */
    static IsOnSameFace(coordinate1, coordinate2) {
        var sameX = coordinate1[0] === coordinate2[0];
        var sameY = coordinate1[1] === coordinate2[1];
        var sameZ = coordinate1[2] === coordinate2[2];
        return sameX || sameY || sameZ;
    }

    static AdjacentFace(color, topColor, side) {
        let multiplier = side === 'l' ? 1 : -1;
        let coordinate = CrossProduct(this.ColorToOrientation[color], this.ColorToOrientation[topColor]);
        coordinate = coordinate.map(val => multiplier * val)
        return Face.OrientationToColor[coordinate];
    }

    /*
    * Definition - Returns the face orientation 
    * Input - coordinate: Array
    * Output - coordinate: Array
    */
    static GiveOppositeFaceOrientation(coordinate) {
        coordinate = coordinate.map(val => -val);
        return coordinate;
    }
}