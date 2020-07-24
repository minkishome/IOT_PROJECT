import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  SplineSeries,
  Legend,
  ZoomAndPan,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import { ValueScale, Animation, ArgumentScale } from '@devexpress/dx-react-chart';
import Grid from '@material-ui/core/Grid';
import DatePicker from 'react-datepicker';

const BarnChart = ({ barnData, b_date, onChangeDate }) => {

  return (
    <Paper>
      <Chart
        data={barnData}
      >
        <ValueScale name="temperature" modifyDomain={()=>[-30, 60]} />
        <ValueScale name="humidity" modifyDomain={()=>[0, 100]} />
        <ValueScale name="ch4" modifyDomain={()=>[0, 5]} />

        <ArgumentScale />

        <ArgumentAxis />
        <ValueAxis scaleName="temperature" position="right" showGrid={false} showLine showTicks />
        <ValueAxis scaleName="humidity" position="right" showGrid={false} showLine showTicks />
        <ValueAxis scaleName="ch4" position="right" showGrid={false} showLine showTicks />

        <SplineSeries
          name="온도"
          valueField="temperature"
          argumentField="t"
          scaleName="temperature"
          color="pink"
        />

        <SplineSeries
          name="습도"
          valueField="humidity"
          argumentField="t"
          scaleName="humidity"
          color="lightblue"
        />

        <SplineSeries
          name="CH4"
          valueField="ch4"
          argumentField="t"
          scaleName="ch4"
          color="lime"
        />

        <Animation />
        <ZoomAndPan />
        <Legend />
      </Chart>
      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
        <Chart
          data={barnData}
          height={300}
        >
          <ValueScale name="temperature" modifyDomain={()=>[-30, 60]} />

          <ArgumentAxis />
          <ValueAxis scaleName="temperature" position="right" showGrid={false} showLine showTicks />

          <SplineSeries
            name="온도"
            valueField="temperature"
            argumentField="t"
            scaleName="temperature"
            color="pink"
          />
          <Title text="온도" />
          <Animation />
          <ZoomAndPan />
        </Chart>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <Chart
          data={barnData}
          height={300}
        >
          <ValueScale name="humidity" modifyDomain={()=>[0, 100]} />

          <ArgumentAxis />
          <ValueAxis scaleName="humidity" position="right" showGrid={false} showLine showTicks />

          <SplineSeries
            name="습도"
            valueField="humidity"
            argumentField="t"
            scaleName="humidity"
            color="lightblue"
          />
          <Title text="습도" />
          <Animation />
          <ZoomAndPan />
        </Chart>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
        <Chart
          data={barnData}
          height={300}
        >
          <ValueScale name="ch4" modifyDomain={()=>[0, 5]} />

          <ArgumentAxis />
          <ValueAxis scaleName="ch4" position="right" showGrid={false} showLine showTicks />

          <SplineSeries
            name="CH4"
            valueField="ch4"
            argumentField="t"
            scaleName="ch4"
            color="lime"
          />
          <Title text="CH4" />
          <Animation />
          <ZoomAndPan />
        </Chart>
        </Grid>
      </Grid>
      <DatePicker selected={b_date} onChange={onChangeDate} />
    </Paper>
  );
}

export default BarnChart;