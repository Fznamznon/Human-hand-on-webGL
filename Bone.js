var Bones = [];

function Bone(filename, VertexPositionBuffer, VertexIndicesBuffer, Joint, Visible, parent, childs) {
    this.filename = filename;
    this.VertexPositionBuffer = VertexPositionBuffer;
    this.VertexIndicesBuffer = VertexIndicesBuffer;
    this.Joint = Joint;
    this.Visible = Visible;
    this.Childs = childs;
    Bones.push(this);
    if (parent != null)
        parent.Childs.push(this);
}

function Joint(location, orientation, movable, motion) {

    this.location = location;
    this.orientation = orientation;
    this.movable = movable;
    this.Motion = motion;
}

function Motion(axis, min, max, cur_value) {
    this.axis = axis;
    this.min = min;
    this.max = max;
    this.cur_value = cur_value;
    
}


var humerus = new Bone("bones/humerus.asc", null, null, null, true, null, [] );

var elbow_flexion = new Motion([0.226046935824, 0.191039945763, 0.955199728815],
    0.0,
    2.268928027593,
    0.0
);

var elbow = new Joint(
    [0.0127, -0.274, 0.0389],
    [0, 0, 0],
    true,
    elbow_flexion
);

var ulna = new Bone("bones/_ulna.asc", null, null, elbow, true, humerus, [] );

var pro_sup = new Motion(
    [0.056398022307, 0.983577389037, -0.171449067814],
    -1.570796326795,
    1.570796326795,
    0.0
)


var radioulnar = new Joint(

    [-0.0065, -0.008, 0.027],
    [0, 0, 0],
    true,
    pro_sup
);

var radius = new Bone("bones/_radius.asc", null, null, radioulnar, true, ulna, []);



function initSlider(bone, num) {
    var div = document.createElement('div');
    div.id = "Moving"+num.toString();

    document.body.appendChild(div);

    $("#" + div.id).slider({
        min: bone.Joint.Motion.min,
        max: bone.Joint.Motion.max,
        step: 0.001,
        slide: function( event, ui ) {
            bone.Joint.Motion.cur_value = ui.value;
        }
    }).slider("float");

}