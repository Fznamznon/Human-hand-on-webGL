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
);


var radioulnar = new Joint(

    [-0.0065, -0.008, 0.027],
    [0, 0, 0],
    true,
    pro_sup
);

var radius = new Bone("bones/_radius.asc", null, null, radioulnar, true, ulna, []);

var rad_rotaxis = new Joint(
    [-0.0085, -0.2313, 0.0561],
    [-0.261799387799, 0.392699081699, 0.0],
    false,
    null
);

var rotaxis = new Bone(null, null, null, rad_rotaxis, false, radius, []);

var flexion = new Motion(
    [0, 0, 1],
    -1.221730476396,
    1.221730476396,
    0.0
);

var rotaxis_auxprfem = new Joint(
    [-0.001, 0.009, 0.0],
    [0, 0, 0],
    true,
    flexion);

var auxprfem = new Bone(null, null, null, rotaxis_auxprfem, false, rotaxis, []);

var deviation = new Motion(
    [1, 0, 0],
    -0.436332312999,
    0.610865238198,
    0.0
);

var auxprfem_auxprrud = new Joint(
    [0, 0, 0],
    [0, 0, 0],
    true,
    deviation
);

var auxprrud = new Bone(null, null, null, auxprfem_auxprrud, false, auxprfem, []);

var auxprrud_auxdrfem = new Joint(
    [0.001, -0.02, 0.0],
    [0, 0, 0],
    false,
    null
);

var auxdrfem = new Bone(null, null, null, auxprrud_auxdrfem, false, auxprrud, []);

var auxdrfem_auxdrrud = new Joint(
    [0, 0, 0],
    [0, 0, 0],
    false,
    null
);

var auxdrrud = new Bone(null, null, null, auxdrfem_auxdrrud, false, auxdrfem, []);

var prox_scaph = new Joint(
    [-0.0035, -0.0025, 0.009],
    [0.401425727959, 0.0, 0.0],
    false,
    null
);

var scaphoid = new Bone("bones/_r_scaph.asc", null, null, prox_scaph, true, auxprrud, []);

var prox_lun = new Joint(
    [-0.004, -0.0015, -0.007],
    [0, 0, 0],
    false,
    null
);

var lunate = new Bone("bones/_r_lun.asc", null, null, prox_lun, true, auxprrud, []);

var dist_trpzm = new Joint(
    [0.0035, -0.0035, 0.02],
    [-0.261799387799, 0.0, 0.0],
    false,
    null
);

var trapezium = new Bone("bones/_r_trpzm.asc", null, null, dist_trpzm, true, auxdrrud, []);

var dist_trpzd = new Joint(
    [-0.0015, -0.0044, 0.0134],
    [0.349065850399, -0.174532925199, 0.0],
    false,
    null
);

var trapezoid = new Bone("bones/_r_trpzd.asc", null, null, dist_trpzd, true, auxdrrud, []);

var dist_cap = new Joint(
    [-0.0155, -0.0018, -0.0055],
    [0.174532925199, 0.0, 0.0],
    false,
    null
);

var capitate = new Bone("bones/_r_cap.asc", null, null, dist_cap, true, auxdrrud, []);

var prox_pis = new Joint(
    [0.005, -0.015, -0.0201],
    [0, 0, 0],
    false,
    null
);

var pisiform = new Bone("bones/_r_pis.asc", null, null, prox_pis, true, auxprrud, []);

var prox_triq = new Joint(
    [-0.0055, -0.01, -0.021],
    [0, 0, 0],
    false,
    null
);

var triquetrum = new Bone("bones/_r_triq.asc", null, null, prox_pis, true, auxprrud, []);

var dist_ham = new Joint(
    [-0.006, -0.005, -0.0175],
    [-0.209439510239, 0.0, 0.0],
    false,
    null
);

var hamate = new Bone("bones/_r_ham.asc", null, null, dist_ham, true, auxdrrud, []);

var auxCMC = new Joint(
    [0, 0, 0],
    [0, 0, 0],
    false,
    null
);

var carp_metacarp = new Bone(null, null, null, auxCMC, false, auxdrrud, []);

var CMC2 = new Joint(
    [-0.0047, -0.0095, -0.005],
    [0.174532925199, 0.261799387799, 0.0],
    false,
    null
);

var metacarpal2 = new Bone("bones/_fingers1.asc", null, null, CMC2, true,  carp_metacarp, []);



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