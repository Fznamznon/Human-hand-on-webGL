var Bones = [];

function Bone(filename, VertexPositionBuffer, VertexIndicesBuffer, Coordinate) {
    this.filename = filename;
    this.VertexPositionBuffer = VertexPositionBuffer;
    this.VertexIndicesBuffer = VertexIndicesBuffer;
    this.Coordinate = Coordinate;
    Bones.push(this);



}

function Joint(axis, min, max, cur_value, location, movable) {
    this.axis = axis;
    this.min = min;
    this.max = max;
    this.cur_value = cur_value;
    this.location = location;
    this.movable = movable;

}
var humerus = new Bone("bones/humerus.asc", null, null, null);
var elbow_flexion = new Joint(
    [0.226046935824, 0.191039945763, 0.955199728815],
    0.0,
    2.268928027593,
    0.0,
    [0.0127, -0.274, 0.0389],
    true

);

var ulna = new Bone("bones/_ulna.asc", null, null, elbow_flexion);

var radioulnar = new Joint(
    [0.056398022307, 0.983577389037, -0.171449067814],
    -1.570796326795,
    1.570796326795,
    0.0,
    [-0.0065, -0.008, 0.027],
    true
);

var radius = new Bone("bones/_radius.asc", null, null, radioulnar);


function initSlider(bone, num) {
    var div = document.createElement('div');
    div.id = "Moving"+num.toString();

    document.body.appendChild(div);

    $("#" + div.id).slider({
        min: bone.Coordinate.min,
        max: bone.Coordinate.max,
        step: 0.001,
        slide: function( event, ui ) {
            bone.Coordinate.cur_value = ui.value;
        }
    }).slider("float");

}