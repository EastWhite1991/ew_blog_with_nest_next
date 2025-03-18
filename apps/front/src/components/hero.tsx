const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-sky-500 to-indigo-500 text-white pt-12">
      <div className="container justify-center mx-auto flex flex-col md:flex-row items-center flex-wrap px-3">
        {/* Left Col */}
        <div className="flex flex-col w-full justify-center items-start md:w-2/5 text-center md:text-left">
          <p className="capitalize tracking-wide w-full">
            Explore insights , tutorials, and stories for curious minds like
            yours
          </p>
          <h2 className="my-5 text-5xl font-bold leading-tight">
            Welcome To Sakura Dev Blog
          </h2>

          <p className="capitalize leading-normal text-xl">
            Join a community that thrives on learning, creating and growing
            together.{" "}
          </p>
        </div>

        {/* right col */}
        <div className="w-full flex justify-center text-center py-7 md:w-3/5">
          <img
            src="/hero.png"
            alt="hero section"
            className="w-full md:w-3/5  "
          />
        </div>
      </div>
      <div className="relative -mt-10 lg:-mt-24">
        <svg
          viewBox="0 0 1428 174"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g
              transform="translate(-2.000000, 44.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path
                d="M0,0 C90.7283404,0.927527913 147.912752,27.187927 291.910178,59.9119003 C387.908462,81.7278826 543.605069,89.334785 759,82.7326078 C469.336065,156.254352 216.336065,153.6679 0,74.9732496"
                opacity="0.100000001"
              ></path>
              <path
                d="M100,104.708498 C277.413333,72.2345949 426.147877,52.5246657 546.203633,45.5787101 C666.259389,38.6327546 810.524845,41.7979068 979,55.0741668 C931.069965,56.122511 810.303266,74.8455141 616.699903,111.243176 C423.096539,147.640838 250.863238,145.462612 100,104.708498 Z"
                opacity="0.100000001"
              ></path>
              <path
                d="M1046,51.6521276 C1130.83045,29.328812 1279.08318,17.607883 1439,40.1656806 L1439,120 C1271.17211,77.9435312 1140.17211,55.1609071 1046,51.6521276 Z"
                id="Path-4"
                opacity="0.200000003"
              ></path>
            </g>
            <g
              transform="translate(-4.000000, 76.000000)"
              fill="#FFFFFF"
              fillRule="nonzero"
            >
              <path d="M0.457,34.035 C57.086,53.198 98.208,65.809 123.822,71.865 C181.454,85.495 234.295,90.29 272.033,93.459 C311.355,96.759 396.635,95.801 461.025,91.663 C486.76,90.01 518.727,86.372 556.926,80.752 C595.747,74.596 622.372,70.008 636.799,66.991 C663.913,61.324 712.501,49.503 727.605,46.128 C780.47,34.317 818.839,22.532 856.324,15.904 C922.689,4.169 955.676,2.522 1011.185,0.432 C1060.705,1.477 1097.39,3.129 1121.236,5.387 C1161.703,9.219 1208.621,17.821 1235.4,22.304 C1285.855,30.748 1354.351,47.432 1440.886,72.354 L1441.191,104.352 L1.121,104.031 L0.457,34.035 Z"></path>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

/**
bg-gradient-to-br：表示背景使用从左上角到右下角的渐变效果。
from-sky-500：渐变的起始颜色为 sky-500，这是 Tailwind CSS 预设的天蓝色调。
to-indigo-500：渐变的结束颜色为 indigo-500，这是 Tailwind CSS 预设的靛蓝色调。
text-white：文本颜色设置为白色。
pt-12：元素的顶部内边距设置为 12 个单位（具体大小取决于 Tailwind CSS 的配置）。

container：将元素宽度设置为响应式的容器宽度。
justify-center：在主轴上居中对齐子元素。
mx-auto：水平方向自动居中。
flex：将元素设置为 Flexbox 容器。
flex-col：子元素在垂直方向排列。
md:flex-row：在中等屏幕及以上时，子元素在水平方向排列。
items-center：在交叉轴上居中对齐子元素。
flex-wrap：允许子元素换行。
px-3：元素的左右内边距设置为 3 个单位。

- Left Col 
flex：将该元素设置为 Flexbox 容器，这样可以使用 Flexbox 的布局属性来排列其子元素。
flex-col：指定子元素在垂直方向上排列。
w-full：设置元素的宽度为其父元素的 100%。
justify-center：在主轴（这里是垂直方向，因为 flex-col）上居中对齐子元素。
items-start：在交叉轴（这里是水平方向）上左对齐子元素。
md:w-2/5：在中等屏幕及以上尺寸时，将元素的宽度设置为其父元素宽度的五分之二。
text-center：将文本内容水平居中对齐。
md:text-left：在中等屏幕及以上尺寸时，将文本内容左对齐。

capitalize：将文本中的每个单词的首字母大写。
tracking-wide：增加字母之间的间距，使文本看起来更开阔。
w-full：设置元素的宽度为其父元素的 100%。

my-5：设置元素的上下外边距为 5 个单位（具体大小取决于 Tailwind CSS 的配置）。
text-5xl：设置文本的字体大小为 5xl，这是一个相对较大的字体尺寸。
font-bold：设置文本的字体为粗体。
leading-tight：减少文本行与行之间的间距，使文本更加紧凑。

capitalize：将文本中的每个单词的首字母大写。
leading-normal：设置文本行与行之间的间距为正常大小。
text-xl：设置文本的字体大小为 xl，比普通字体稍大。

- svg
viewBox="0 0 1428 174"：定义了 SVG 的视口范围，即 SVG 内容的可见区域。这里表示视口的左上角坐标为 (0, 0)，宽度为 1428，高度为 174。
version="1.1"：指定 SVG 的版本为 1.1。
xmlns="http://www.w3.org/2000/svg"：指定 SVG 的命名空间，确保 SVG 元素被正确解析。

stroke="none"：设置描边颜色为无，即不显示描边。
strokeWidth="1"：设置描边宽度为 1，但由于 stroke="none"，实际上不会显示描边。
fill="none"：设置填充颜色为无，即不填充。
fillRule="evenodd"：指定填充规则为奇偶规则，用于确定哪些区域应该被填充。

transform="translate(-2.000000, 44.000000)"：对该组元素进行平移变换，将其向左移动 2 个单位，向下移动 44 个单位。
fill="#FFFFFF"：设置填充颜色为白色。
fillRule="nonzero"：指定填充规则为非零规则，用于确定哪些区域应该被填充。

path:
d 属性：定义了路径的形状，使用 SVG 路径命令来描述。这里使用了贝塞尔曲线命令 C 来创建平滑的曲线。
opacity="0.100000001"：设置路径的透明度为 0.1，使其半透明。
 */
